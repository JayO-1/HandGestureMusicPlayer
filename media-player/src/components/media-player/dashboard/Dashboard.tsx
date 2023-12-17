import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import Tooltip from '@mui/material/Tooltip';

import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import GestureControl from './GestureControl';
import { AuthCodeProps, SongSearchResult } from '../../../common/types';
import useAuth from '../../../hooks/useAuth';
import { ENDPOINTS } from '../../../common/constants';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dashboard(props: AuthCodeProps) {
    const accessToken = useAuth(props.code)
    const [search, setSearch] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Array<SongSearchResult>>([])
    const [playingTrack, setPlayingTrack] = useState<SongSearchResult>()
    const [nextPlayingTrack, setNextPlayingTrack] = useState<SongSearchResult>()
    const [showEnqueueSuccess, setShowEnqueueSuccess] = useState<boolean>(false)
    const [showPlaylists, setShowPlaylists] = useState<boolean>(false)

    function chooseTrack(track: SongSearchResult) {
      setPlayingTrack(track)
      setSearch('')
    }

    function setNextTrack(track: SongSearchResult) {
      setNextPlayingTrack(track)
    }

    function getPlaylists() {
      setShowPlaylists(true)
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setShowEnqueueSuccess(false);
    };

    useEffect(() => {
      if (!search && searchResults.length && searchResults[0].isPlaylist) return
      if (!search) return setSearchResults([])
      if (!accessToken) return

      let cancel: boolean = false
      axios
      .post(ENDPOINTS.SEARCH_TRACK, {
        trackName: search,
        accessToken
      })
      .then(res => {
          if (!res.data.body.tracks) return
          if (cancel) return

          setSearchResults(
          res.data.body.tracks.items.map((track: any) => {
              const smallestAlbumImage = track.album.images.reduce(
              (smallest: any, image: any) => {
                  if (image.height && smallest.height && image.height < smallest.height) return image
                  return smallest
              },
              track.album.images[0]
              )

              return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              isPlaylist: false
              }
          }))
      })
      .catch(err => {
          console.log(err)
      })

      return () => { 
        cancel = true
      };
    }, [search, accessToken])

    useEffect(() => {
      if (!nextPlayingTrack) return
      if (!accessToken) return

      axios
      .post(ENDPOINTS.ADD_TO_QUEUE, {
        accessToken,
        trackUri: nextPlayingTrack.uri
      })
      .then(res => {
          console.log(res)
          setShowEnqueueSuccess(true)
      })
      .catch(err => {
          console.log(err)
      })
    }, [nextPlayingTrack, accessToken])

    useEffect(() => {
      if (!showPlaylists) return
      if (!accessToken) return

      axios
      .post(ENDPOINTS.GET_PLAYLISTS, {
        accessToken
      })
      .then(res => {
        if (!res.data.items) return
        
        setSearchResults(
        res.data.items.map((playlist: any) => {
          const smallestPlaylistImage = playlist.images.reduce(
            (smallest: any, image: any) => {
              if (image.height && smallest.height && image.height < smallest.height) return image
              return smallest
            },
            playlist.images[0]
            )
            
            return {
            artist: playlist.owner.display_name,
            title: playlist.name,
            uri: playlist.uri,
            ...(smallestPlaylistImage ? { albumUrl: smallestPlaylistImage.url } : {}),
            isPlaylist: true
            }
        }))
      })
      .catch(err => {
          console.log(err)
      })

      setShowPlaylists(false)
    }, [showPlaylists, accessToken])

    return (
        <div>
          <AppBar position="static">
            <Toolbar sx={{ background: '#1DB954' }}>
              <MusicNoteIcon sx={{ mr: 2 }} />
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                  Powered By Spotify
              </Typography>
              <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase 
                    placeholder="Search Songs" 
                    inputProps={{ 'aria-label': 'search' }} 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                  />
              </Search>
            </Toolbar>
          </AppBar>

          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            sx={{ margin: '10px' }}
          >
            {searchResults.map(track => {
              return <Grid key={"grid" + track.uri} item xs={3}> <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} addToQueue={setNextTrack}/> </Grid>
            })}
          </Grid>

          <div style={{ margin: '15px', alignItems: 'center' }}>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={0}
              justifyContent="center"
            >
              <Tooltip title="Get Playlists">
                <IconButton aria-label="get-playlists" onClick={getPlaylists}>
                  <PlaylistPlayIcon fontSize="large"/>
                </IconButton>
              </Tooltip>
            </Stack>
          </div>

          <div style={{ margin: '15px', alignItems: 'center' }}>
            <GestureControl accessToken={accessToken} />
          </div>

          <Snackbar open={showEnqueueSuccess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
              Added to queue
            </Alert>
          </Snackbar>
        </div>
    );
  }

  export default Dashboard;