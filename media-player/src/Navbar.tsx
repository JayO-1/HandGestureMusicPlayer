import React from 'react';
import { Link } from 'react-router-dom';
import { AuthURLProps } from './common/types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

function Navbar(props: AuthURLProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{ background: '#282c34' }}>
        <Link to="/">
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, color: "white" }}
        >
        <HomeIcon />
        </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hand Gesture Media Player
        </Typography>
        <Link style={{ textDecoration: "none", color: "white" }} to="/instructions"><Button color="inherit">Instructions</Button></Link>
        <Button color="inherit" href={ props.authURL }>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;