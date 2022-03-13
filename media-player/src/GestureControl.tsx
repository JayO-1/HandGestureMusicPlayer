import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as Hands from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import * as mp_drawing from "@mediapipe/drawing_utils";
import * as tf from '@tensorflow/tfjs';

import { calcLandmarkList, preprocessLandmark, inference } from './KeypointClassifierUtils';
import { CAM_WIDTH, CAM_HEIGHT } from "./common/constants";
import { GestureControlProps, VolumeLevels, GestureLabels } from "./common/types";

function getLowerVolume(oldVolume: VolumeLevels): VolumeLevels | null {
    if (oldVolume === VolumeLevels.Muted) return null

    switch(oldVolume) {
        case VolumeLevels.High:
            return VolumeLevels.MediumHigh
        case VolumeLevels.MediumHigh:
            return VolumeLevels.Medium
        case VolumeLevels.Medium:
            return VolumeLevels.MediumLow
        case VolumeLevels.MediumLow:
            return VolumeLevels.Low
        case VolumeLevels.Low:
            return VolumeLevels.Muted
    }
}

function getHigherVolume(oldVolume: VolumeLevels): VolumeLevels | null {
    if (oldVolume === VolumeLevels.High) return null

    switch(oldVolume) {
        case VolumeLevels.Muted:
            return VolumeLevels.Low
        case VolumeLevels.Low:
            return VolumeLevels.MediumLow
        case VolumeLevels.MediumLow:
            return VolumeLevels.Medium
        case VolumeLevels.Medium:
            return VolumeLevels.MediumHigh
        case VolumeLevels.MediumHigh:
            return VolumeLevels.High
    }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GestureControl(props: GestureControlProps) {
  const [gesture, setGesture] = useState<GestureLabels>()
  const [volume, setVolume] = useState<VolumeLevels>(VolumeLevels.High)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const accessToken = props.accessToken

  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let camera = null

  const loadModel = async () => {
    const model = await tf.loadGraphModel(process.env.PUBLIC_URL + 'hand_recognition/model.json')
    console.log('model loaded.')
    return model
  }

  function onResults(results: Hands.Results, gestureModel: tf.GraphModel) {
    // const video = webcamRef.current.video;
    if (!webcamRef.current) return

    const webcamVideo = webcamRef.current.video;

    if (!webcamVideo) return

    const videoWidth = webcamVideo.videoWidth;
    const videoHeight = webcamVideo.videoHeight;

    // Set canvas width
    if (!canvasRef.current) return

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (!canvasCtx) return

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            mp_drawing.drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS,
                            {color: '#4CD49D', lineWidth: 5});
            mp_drawing.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            
            let landmarkList = calcLandmarkList(landmarks)
            let preprocessedLandmarkList = preprocessLandmark(landmarkList)
            if (gestureModel) {
                console.log("querying model")
                const predictedGesture = inference(gestureModel, preprocessedLandmarkList)
                if (predictedGesture !== gesture) {
                    setGesture(predictedGesture)
                }

                canvasCtx.font = "50px Courier New"
                canvasCtx.fillStyle = "red"
                canvasCtx.textAlign = "center"
                canvasCtx.fillText(predictedGesture, canvasElement.width/2, canvasElement.height - 10)
            }
        }
    }

    canvasCtx.restore();
  }

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  // setInterval(())
  useEffect(() => {
    const hands = new Hands.Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
        selfieMode: true
    });

    loadModel()
    .then(model => {
        hands.onResults(results => {
            onResults(results, model)
        })
    })

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) 
    {
        if (webcamRef.current && webcamRef.current.video) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (!webcamRef.current || !webcamRef.current.video) return
                    await hands.send({ image: webcamRef.current.video });
                },
            width: CAM_WIDTH,
            height: CAM_HEIGHT
        });
            camera.start();
        }
    }
  }, []);

  useEffect(() => {
    if (!gesture) return
    console.log("handling gesture", gesture)

    let data, onSuccess;
    let onFailure = (err: any) => {
        console.log(err)

        if (err.response.status === 429) {
            setShowAlert(true)
        }
    };

    if (gesture === GestureLabels.IncreaseVolume || gesture === GestureLabels.DecreaseVolume 
        || gesture === GestureLabels.Mute) {
        const oldVolume: VolumeLevels = volume
        let newVolume: VolumeLevels | null = gesture === GestureLabels.Mute ? VolumeLevels.Muted : 
        gesture === GestureLabels.DecreaseVolume ? getLowerVolume(oldVolume) : getHigherVolume(oldVolume)

        if (!newVolume) return

        data = {
            accessToken,
            gesture,
            volume: newVolume === VolumeLevels.Muted ? 0 : newVolume
        }

        onSuccess = (res: any) => {
            console.log("gesture sent: ", gesture)
            console.log("response: ", res)

            if (!newVolume) return
            setVolume(newVolume)
        }
    }
    else {
        data = {
            accessToken,
            gesture
        }

        onSuccess = (res: any) => {
            console.log("gesture sent: ", gesture)
            console.log("response: ", res)
        } 
    }
    
    axios
    .post("http://localhost:3001/handleGesture", data)
    .then(onSuccess)
    .catch(onFailure)
  }, [gesture]);

  return (
    <div>
        <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                width: CAM_WIDTH,
                height: CAM_HEIGHT
            }}
        />{" "}
        <canvas
            ref={canvasRef}
            className="output_canvas"
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                width: CAM_WIDTH,
                height: CAM_HEIGHT
            }}
        ></canvas>
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                Entering gestures too fast, <strong>slow down</strong>!
            </Alert>
        </Snackbar>
    </div>
  );
}

export default GestureControl;