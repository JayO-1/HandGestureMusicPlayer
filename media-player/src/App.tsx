import React from 'react';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import Box from '@mui/material/Box';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Instructions from './components/instructions/Instructions';
import MediaPlayer from './components/media-player/MediaPlayer';
import Copyright from './components/copyright/Copyright';

import { AUTH_URL } from './common/constants';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar authURL={ AUTH_URL } />
      </header>

      <main>
        <Switch>
          <Route exact path="/">
            <Home authURL={ AUTH_URL } />
          </Route>

          <Route exact path="/instructions">
            <Instructions />
          </Route>

          <Route exact path="/media-player">
            <MediaPlayer />
          </Route>
        </Switch>
      </main>

      <footer>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Copyright />
        </Box>
      </footer>
    </div>
  );
}

export default App;
