import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InstructionCard from './InstructionCard';
import { InstructionSteps } from './common/types';

const userInstructions: InstructionSteps = [
  {
      title: 'Step 1', 
      description: 'Have a look at all the available gestures shown above. Note: these gestures are right hand only, and are from the perspective of what should be seen on screen',
      imgPath: `${process.env.PUBLIC_URL}/assets/images/available_hand_gestures.png`,
      imgWidth: '500',
      imgHeight: '375',
      imgAlt: 'Available hand gestures for playback control'
  },
  {
      title: 'Step 2',
      description: 'Log in through your Spotify Account, and accept all permissions. Note: a premium account is needed',
      imgPath: `${process.env.PUBLIC_URL}/assets/images/spotify_logo.png`,
      imgWidth: '500',
      imgHeight: '250',
      imgAlt: 'Spotify logo'
  },
  {
      title: 'Step 3',
      description: 'Try out a few of the gestures on the webcam screen!',
      imgPath: `${process.env.PUBLIC_URL}/assets/images/test_gesture.png`,
      imgWidth: '500',
      imgHeight: '425',
      imgAlt: 'Testing gesture control'
  },
  {
      title: 'Step 4',
      description: 'Start controlling media! You can search for specific songs and construct a playback queue via the search bar, or load your playlists using the button below the media controller',
      imgPath: `${process.env.PUBLIC_URL}/assets/images/media_player_annotated.png`,
      imgWidth: '500',
      imgHeight: '450',
      imgAlt: 'Media player screen annotated'
  }
]

function Instructions() {
  return (
    <Box
    sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
    }}
    >

      <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          sx={{ margin: '10px' }}
      >
        <Grid item xs={3}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Instructions
          </Typography>
        </Grid>

        {userInstructions.map(instruction => {
          return <Grid item xs={3}> <InstructionCard {...instruction} /> </Grid>
        })}
      </Grid>
    </Box>
  );
}

export default Instructions;