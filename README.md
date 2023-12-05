# HandGestureMusicPlayer
A music player for Spotify that is controlled using hand gesture recognition, using MediaPipe for hand feature extraction and a simple Neural Network for classification, created with TensorFlow.
Built for my Final Year Computer Science Dissertation at the University of Manchester.

## Repo Structure

### Branch 1: HandPoseEstimation
Contains a Jupyter notebook with some basic experimentation for hand pose estimation using OpenCV and MediaPipe

### Branch 2: GestureRecognition
- Keypoint_model_training.ipynb: A Jupyter notebook for training the FFNN used for gesture recognition
- Keypoint_model_application.ipynb: A Jupyter notebook for applying the trained FFNN real-time using Mediapipe and OpenCV
- model/keypoint_classifier/: Folder containing the saved weights of the FFNN
- media-player/: Folder containing the media player itself, in the form of a React Web App
- mp-server/: The backend of the media player, where calls are made to the Spotify API for playback control

More detail about this project can be found in my [dissertation](https://www.overleaf.com/read/spnxstqsgfzh)

## Startup Instructions

1. Clone the repo
2. Switch to the 'GestureRecognition' branch
3. Run 'npm start' within mp-server
4. Run 'npm start' within media-player/src
