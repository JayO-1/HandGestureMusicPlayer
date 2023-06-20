# HandGestureMusicPlayer
Music Player for Spotify controlled using Hand Gesture Recognition, using MediaPipe for feature extraction and a simple Neural Network for classification.
Created for Final Year Computer Science Project at the University of Manchester

## Repo Structure

### Branch 1: HandPoseEstimation
Contains a Jupyter notebook with some basic experimentation for hand pose estimation using OpenCV and MediaPipe

### Branch 2: GestureRecognition
- Keypoint_model_training.ipynb: A Jupyter notebook for training the FFNN used for gesture recognition
- Keypoint_model_application.ipynb: A Jupyter notebook for applying the trained FFNN real-time using Mediapipe and OpenCV
- model/keypoint_classifier/: Folder containing the saved weights of the FFNN
- media-player/: Folder containing the media player itself, in the form of a React Web App
- mp-server/: The backend of the media player, where calls are made to the Spotify API for playback control
