import * as Hands from "@mediapipe/hands";
import * as tf from '@tensorflow/tfjs';
import { CAM_WIDTH, CAM_HEIGHT } from "./common/constants";
import { FrequencyMap, QueueArray, GestureLabels } from "./common/types";

class Queue {
    items: QueueArray
    headIndex: number
    tailIndex: number
    maxLength: number

    constructor(maxLen: number) {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
      this.maxLength = maxLen;
    }

    enqueue(item: number) {
      if (this.length >= this.maxLength) {
          this.dequeue()
      }
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }

    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }

    peek() {
      return this.items[this.headIndex];
    }

    clear() {
      while (this.length > 0) {
          this.dequeue()
      }
    }

    get length() {
      return this.tailIndex - this.headIndex;
    }
}

export class GestureBuffer {
    buffer: Queue
    bufferLength: number

    constructor(bufferLen: number = 10) {
        this.buffer = new Queue(bufferLen);
        this.bufferLength = bufferLen;
    }

    addGesture(gestureId: number) {
        this.buffer.enqueue(gestureId)
    }

    getGesture() {
        const frequencies: FrequencyMap = {}
        Object.values(this.buffer.items).map((gesture: number) => {
            frequencies[gesture] = (frequencies[gesture] ?? 0) + 1
        })

        const mostCommonGesture: string = Object.keys(frequencies).reduce((a, b) => {
            return frequencies[a] > frequencies[b] ? a : b
        })

        const gestureAsNumber: number = Number(mostCommonGesture)

        if (frequencies[gestureAsNumber] >= this.bufferLength) {
            this.buffer.clear()
        }

        return gestureAsNumber
    }
}

// Ordered by class i.e. class 0 = Play, class 1 = Pause, etc
const labels = [GestureLabels.Play, GestureLabels.Pause, GestureLabels.IncreaseVolume, GestureLabels.Mute,
    GestureLabels.DecreaseVolume, GestureLabels.Knuckles, GestureLabels.PreviousSong, GestureLabels.NextSong]
const buffer = new GestureBuffer()

export function calcLandmarkList(landmarks: Hands.LandmarkList) {
    let imageWidth = CAM_WIDTH
    let imageHeight = CAM_HEIGHT

    // Keypoint
    let landmark_points = landmarks.map(landmark => {
        let landmark_x = Math.min(landmark.x * imageWidth, imageWidth - 1)
        let landmark_y = Math.min(landmark.y * imageHeight, imageHeight - 1)

        return [landmark_x, landmark_y]
    })

    return landmark_points
}

export function preprocessLandmark(landmarkList: Array<Array<number>>) {
    // Convert to relative coordinates
    let baseX = landmarkList[0][0]
    let baseY = landmarkList[0][1]

    let newLandmarkList = landmarkList.map(landmarkPoint => {
        return [landmarkPoint[0] - baseX, landmarkPoint[1] - baseY]
    })

    // Convert to a one-dimensional list
    let newLandmarkListFlattened = newLandmarkList.flat()

    // Normalization
    let absoluteLandmarkValues = newLandmarkListFlattened.map(landmarkValue => {
        return Math.abs(landmarkValue)
    })

    let maxValue = Math.max(...absoluteLandmarkValues)

    function normalize(n: number) {
        return n / maxValue
    }

    newLandmarkListFlattened = newLandmarkListFlattened.map(landmarkValue => {
        return normalize(landmarkValue)
    })

    return newLandmarkListFlattened
}

export function inference(model: tf.GraphModel, landmarks: Array<number>) {
    const inputTensor: tf.Tensor2D = tf.tensor2d(landmarks, [1, landmarks.length])
    const resultTensor = (model.predict(inputTensor) as tf.Tensor)
    const resultTensorData = resultTensor.dataSync()

    const predictions = Array.from(resultTensorData)
    const predictedId = predictions.indexOf(Math.max(...predictions))

    buffer.addGesture(predictedId)
    const gesture = buffer.getGesture()

    return labels[gesture]
}