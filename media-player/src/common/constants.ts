export const CLIENT_ID: string = 'd92d7da8148c48ad9f5712f3ad7bdba2';
export const REDIRECT_URI: string = 'http://localhost:3000/media-player';
export const SCOPE: string = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private';
export const AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`

export const CAM_WIDTH: number = 480;
export const CAM_HEIGHT: number = 315;