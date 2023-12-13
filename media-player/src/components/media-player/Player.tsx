import React from 'react';
import { useState, useEffect } from 'react';

// @ts-ignore
import SpotifyPlayer from 'react-spotify-web-playback';

import { PlayerProps } from '../../common/types'

function Player(props: PlayerProps) {
    const accessToken: string | undefined = props.accessToken
    const trackUri: string | undefined = props.trackUri

    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (accessToken === undefined) return null
    return (
        <SpotifyPlayer
        token={accessToken}
        name="Hand Gesture Media Player"
        showSaveIcon
        callback={(state: any) => {
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        />
    );
  }

  export default Player;