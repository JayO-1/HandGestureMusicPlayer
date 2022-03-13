import React from 'react';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import Box from '@mui/material/Box';

import Navbar from './Navbar';
import Home from './Home';
import Instructions from './Instructions';
import MediaPlayer from './MediaPlayer';
import Copyright from './Copyright';

import { AUTH_URL } from './common/constants';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
