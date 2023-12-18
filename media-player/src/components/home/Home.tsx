import React from 'react';
import { Link } from 'react-router-dom';
import { AuthURLProps } from '../../common/types';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function Home(props: AuthURLProps) {
  return (
    <Box
    sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
    }}
  >
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h3"
        align="center"
        color="text.primary"
        gutterBottom
      >
        About
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Hello, my name is Jason Ozuzu and this is my Final Year Project at the University of Manchester.
        This is a media player for Spotify that will allow you to control playback using only hand gestures!
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Click one of the buttons below to log into your Spotify account and begin, or view the instructions
      </Typography>
      <Typography variant="caption" color="text.secondary" align="center" paragraph>
        Note that a premium account is needed for full functionality
      </Typography>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={3}
        justifyContent="center"
      >
        <Button aria-label="login" variant="contained" color="success" href={ props.authURL }>Login</Button>
        <Link style={{ textDecoration: "none" }} to="/instructions"><Button aria-label="instructions" variant="outlined">Instructions</Button></Link>
      </Stack>
    </Container>
  </Box>
  );
}

export default Home;