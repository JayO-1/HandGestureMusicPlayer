import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaPlayer from './MediaPlayer';

function URLParser() {
  const code = new URLSearchParams(window.location.search).get('code')

  return (
      <MediaPlayer code={code}/>
  );
}

export default URLParser;