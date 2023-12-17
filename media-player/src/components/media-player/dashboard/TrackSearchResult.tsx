import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueIcon from '@mui/icons-material/Queue';
import Tooltip from '@mui/material/Tooltip';

import { Track } from '../../../common/types';

function TrackSearchResult(props: Track) {
    const track = props.track

    function handlePlay() {
        props.chooseTrack(track)
    }

    function handleEnqueue() {
        props.addToQueue(track)
    }

    return (
    <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                {track.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {track.artist}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Tooltip title="Play">
                    <IconButton aria-label="play/pause" onClick={handlePlay}>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Tooltip>
                {
                    !track.isPlaylist &&
                    <Tooltip title="Add to Queue">
                        <IconButton aria-label="addToQueue" onClick={handleEnqueue}>
                        <QueueIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </Tooltip>
                }
            </Box>
        </Box>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={track.albumUrl}
        />
    </Card>
    );
  }

  export default TrackSearchResult;