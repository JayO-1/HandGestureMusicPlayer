import React from 'react';
import MediaPlayer from './MediaPlayer';

function URLParser() {
  const code = new URLSearchParams(window.location.search).get('code')

  return (
      <MediaPlayer code={code}/>
  );
}

export default URLParser;