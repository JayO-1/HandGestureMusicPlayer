import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Dashboard from './Dashboard';
import { SearchParams } from '../../common/types';

function MediaPlayer(props: SearchParams) {
  const code = props.code;

  return (
      code ? <Dashboard code={code}/> : 
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        You must be <strong>logged in</strong> to use this functionality
      </Alert>
  );
}

export default MediaPlayer;