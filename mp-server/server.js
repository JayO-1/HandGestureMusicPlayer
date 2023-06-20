const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const app = express()
app.use(cors())
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 10 * 1000, // 10 seconds
	max: 8, // Limit each IP to 5 requests per `window` (here, per 10 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/handleGesture', limiter)

// TODO - Move client secret to file

app.post('/login', (req, res) => {
    const code = req.body.code

    console.log('Logging user in')
    console.log(`User code: ${code}`)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/media-player',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    console.log('Refreshing tokens')
    console.log(`Refresh token: ${refreshToken}`)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/media-player',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: refreshToken
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/searchTrack', (req, res) => {
    const trackName = req.body.trackName
    const accessToken = req.body.accessToken

    console.log(`Search received: ${trackName}`)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/media-player',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi.setAccessToken(accessToken)

    spotifyApi
    .searchTracks(trackName)
    .then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/addToQueue', (req, res) => {
    const accessToken = req.body.accessToken
    const trackUri = req.body.trackUri

    console.log(`Adding track to queue: ${trackUri}`) 
    console.log(`Access Token: ${accessToken}`)

    const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }

    axios.post(url, {}, {
        headers: headers
      })
      .then(data => {
        console.log(data)
        res.sendStatus(204)
      })
      .catch(err => {
        console.log(err.response.data)
        res.sendStatus(400)
    })
})

app.post('/getPlaylists', (req, res) => {
    const accessToken = req.body.accessToken

    console.log('Getting playlists for user') 
    console.log(`Access Token: ${accessToken}`)

    const url = 'https://api.spotify.com/v1/me/playlists?limit=50'

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }

    axios.get(url, {
        headers: headers
      })
      .then(data => {
        res.json(data.data)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/handleGesture', async (req, res) => {
    const accessToken = req.body.accessToken
    const gesture = req.body.gesture
    const volume = req.body.volume

    console.log('Handling gesture') 
    console.log(`Access Token: ${accessToken}`)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/media-player',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi.setAccessToken(accessToken)

    switch(gesture) {
        case 'Play':
            spotifyApi.play()
            .then(() => {
              console.log('Playback resumed')
              res.sendStatus(204)
            }, err => {
                console.log(err);
            });
            break;
        case 'Pause':
            spotifyApi.pause()
            .then(() => {
                console.log('Playback paused')
                res.sendStatus(204)
            }, err => {
                console.log(err);
            });
            break;
        case 'Inc_Vol':
        case 'Dec_Vol':
        case 'Mute':
            console.log(volume)
            spotifyApi.setVolume(volume)
            .then(() => {
                console.log(`Volume set to ${volume}`)
                res.sendStatus(204)
            }, err => {
                console.log(err);
            });
            break; 
        case 'Spud':
            break;
        case 'Prev_Song':
            spotifyApi.skipToPrevious()
            .then(() => {
                console.log('Skip to previous')
                res.sendStatus(204)
            }, err => {
                console.log(err);
            });
            break;
        case 'Next_Song':
            spotifyApi.skipToNext()
            .then(() => {
                console.log('Skipped to next song')
                res.sendStatus(204)
            }, err => {
                console.log(err);
            });
            break;
        default:
            break;
      }
})

app.listen(3001)