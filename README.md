# HandGestureMusicPlayer
> Music player for Spotify controlled using hand gesture recognition

A music player for Spotify that is controlled using hand gesture recognition, using MediaPipe for hand feature extraction and a simple Neural Network for classification, created with TensorFlow.
Built for my Final Year Computer Science Dissertation at the University of Manchester.

## Repo Structure

### Branch 1: HandPoseEstimation
Contains a Jupyter notebook with some basic experimentation for hand pose estimation using OpenCV and MediaPipe

### Branch 2: GestureRecognition
- **Keypoint_model_training.ipynb:** A Jupyter notebook for training the FFNN used for gesture recognition
- **Keypoint_model_application.ipynb:** A Jupyter notebook for applying the trained FFNN real-time using Mediapipe and OpenCV
- **model/keypoint_classifier/:** Folder containing the saved weights of the FFNN
- **media-player/:** Folder containing the media player itself, in the form of a _React Web App_
- **mp-server/:** The backend of the media player, where calls are made to the Spotify API for playback control. Built using _Node.js_ and _Express_

## System Architecture

<p align="center">
  <img src="https://github.com/JayO-1/HandGestureMusicPlayer/blob/main/images/Disso%20Final%20Design.drawio.png?raw=true" alt="Architecture Diagram" width="1000" height="500" />
</p>

_Note: Front-end components are numbered in the order the user is expected to interact with them_

---

More details about this project can be found in my [dissertation](https://www.overleaf.com/read/spnxstqsgfzh). <br/>
**Chapter 4** details choices for **system architecture and design**, while **Chapter 5** discusses **implementation**.

## Startup Instructions

1. Install Node.js [here](https://nodejs.org/en/download)
2. Setup a dev account with Spotify [here](https://developer.spotify.com/) and create a new app
3. Note down your **client ID** and **client secret**
4. Add `http://localhost:3000/` and `http://localhost:3000/media-player` to your list of redirect URIs
5. Clone the repo
6. Switch to the **GestureRecognition** branch
7. Run `npm install` within **mp-server** and **media-player/src** to install the required dependencies
8. Replace the `CLIENT_ID` constant under **media-player/src/common/constants.ts** with your client ID
9. Create a `.env` file under **mp-server**, and populate it as follows:
```
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
```
10. Run `npm start` within **mp-server**
11. Run `npm start` within **media-player/src**

Once you complete step 11, you will see this screen:

<p align="center">
  <img src="https://github.com/JayO-1/HandGestureMusicPlayer/blob/main/images/Disso%20homepage.png?raw=true" alt="Homepage" width="1000" height="500" />
</p>

The instructions page will explain how to use the app, and the available gestures can be seen below:

<p align="center">
  <img src="https://github.com/JayO-1/HandGestureMusicPlayer/blob/main/images/available_hand_gestures-removebg-preview.png?raw=true" alt="Hand Gestures" width="700" height="500" />
</p>

If you wish to skip the instructions and go straight to using the app, simply login to your Spotify account and
you will be redirected to the music player:

<p align="center">
  <img src="https://github.com/JayO-1/HandGestureMusicPlayer/blob/main/images/Disso%20Media%20Player%20Page.png?raw=true" alt="Media Player Page" width="900" height="500" />
</p>

## Demo

<p align="center">
  <img src="https://github.com/JayO-1/HandGestureMusicPlayer/blob/main/images/Disso%20Demo.gif" alt="Demo" />
</p>
