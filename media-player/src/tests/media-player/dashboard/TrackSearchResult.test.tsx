import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { SongSearchResult } from '../../../common/types';
import TrackSearchResult from '../../../components/media-player/dashboard/TrackSearchResult';


describe('TrackSearchResult', () => {
    describe('Song', () => {
        test('Should render search result that has an image', () => {
            const song: SongSearchResult = {
                artist: 'Rihanna',
                title: 'Umbrella',
                uri: '123',
                albumUrl: 'https://google.com/album/cover.png',
                isPlaylist: false
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={song} key={song.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const trackTitle = screen.getByText(song.title);
            const trackArtist = screen.getByText(song.artist);
            const trackImg = screen.getByAltText("no image");
            const playButton = screen.getByRole("button", { name: "play/pause" });
            const enqueueButton = screen.getByRole("button", { name: "addToQueue" });
            
            expect(trackTitle).toBeInTheDocument();
            expect(trackArtist).toBeInTheDocument();
            expect(trackImg).toBeInTheDocument();
            expect(trackImg).toHaveAttribute('src', song.albumUrl);
            expect(playButton).toBeInTheDocument();
            expect(enqueueButton).toBeInTheDocument();
          });
          
          test('Should render search result with no image', () => {
            const song: SongSearchResult = {
                artist: 'Rihanna',
                title: 'Umbrella',
                uri: '123',
                albumUrl: '',
                isPlaylist: false
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={song} key={song.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const trackTitle = screen.getByText(song.title);
            const trackArtist = screen.getByText(song.artist);
            const trackImg = screen.getByAltText("no image");
            const playButton = screen.getByRole("button", { name: "play/pause" });
            const enqueueButton = screen.getByRole("button", { name: "addToQueue" });
            
            expect(trackTitle).toBeInTheDocument();
            expect(trackArtist).toBeInTheDocument();
            expect(trackImg).toBeInTheDocument();
            expect(trackImg).not.toHaveAttribute('src', song.albumUrl);
            expect(playButton).toBeInTheDocument();
            expect(enqueueButton).toBeInTheDocument();
          });

          test('Should call chooseTrack when play button is pressed', () => {
            const song: SongSearchResult = {
                artist: 'Rihanna',
                title: 'Umbrella',
                uri: '123',
                albumUrl: 'https://google.com/album/cover.png',
                isPlaylist: false
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={song} key={song.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const playButton = screen.getByRole("button", { name: "play/pause" });
            fireEvent.click(playButton);
            
            expect(playButton).toBeInTheDocument();
            expect(chooseTrackMock).toHaveBeenCalled();
            expect(setNextTrackMock).not.toHaveBeenCalled();
          });

          test('Should call setNextTrack when enqueue button is pressed', () => {
            const song: SongSearchResult = {
                artist: 'Rihanna',
                title: 'Umbrella',
                uri: '123',
                albumUrl: 'https://google.com/album/cover.png',
                isPlaylist: false
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={song} key={song.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const enqueueButton = screen.getByRole("button", { name: "addToQueue" });
            fireEvent.click(enqueueButton);
            
            expect(enqueueButton).toBeInTheDocument();
            expect(setNextTrackMock).toHaveBeenCalled();
            expect(chooseTrackMock).not.toHaveBeenCalled();
          });
    })

    describe('Playlist', () => {
        test('Should render playlist that has an image', () => {
            const playlist: SongSearchResult = {
                artist: 'John123',
                title: 'My Favs',
                uri: '456',
                albumUrl: 'https://google.com/playlist/cover.png',
                isPlaylist: true
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={playlist} key={playlist.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const playlistTitle = screen.getByText(playlist.title);
            const playlistOwner = screen.getByText(playlist.artist);
            const trackImg = screen.getByAltText("no image");
            const playButton = screen.getByRole("button", { name: "play/pause" });
            const enqueueButton = screen.queryByRole("button", { name: "addToQueue" });
            
            expect(playlistTitle).toBeInTheDocument();
            expect(playlistOwner).toBeInTheDocument();
            expect(trackImg).toBeInTheDocument();
            expect(trackImg).toHaveAttribute('src', playlist.albumUrl);
            expect(playButton).toBeInTheDocument();
            expect(enqueueButton).not.toBeInTheDocument();
        });
          
        test('Should render playlist that has no image', () => {
            const playlist: SongSearchResult = {
                artist: 'John123',
                title: 'My Favs',
                uri: '456',
                albumUrl: '',
                isPlaylist: true
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
          
            render(<TrackSearchResult track={playlist} key={playlist.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const playlistTitle = screen.getByText(playlist.title);
            const playlistOwner = screen.getByText(playlist.artist);
            const trackImg = screen.getByAltText("no image");
            const playButton = screen.getByRole("button", { name: "play/pause" });
            const enqueueButton = screen.queryByRole("button", { name: "addToQueue" });
            
            expect(playlistTitle).toBeInTheDocument();
            expect(playlistOwner).toBeInTheDocument();
            expect(trackImg).toBeInTheDocument();
            expect(trackImg).not.toHaveAttribute('src', playlist.albumUrl);
            expect(playButton).toBeInTheDocument();
            expect(enqueueButton).not.toBeInTheDocument();
        });

        test('Should call chooseTrack when play button is pressed', () => {
            const song: SongSearchResult = {
                artist: 'Rihanna',
                title: 'Umbrella',
                uri: '123',
                albumUrl: 'https://google.com/album/cover.png',
                isPlaylist: true
            };
        
            const chooseTrackMock = jest.fn();
            const setNextTrackMock = jest.fn();
            
            render(<TrackSearchResult track={song} key={song.uri} chooseTrack={chooseTrackMock} addToQueue={setNextTrackMock} />);
            
            const playButton = screen.getByRole("button", { name: "play/pause" });
            fireEvent.click(playButton);
            
            expect(playButton).toBeInTheDocument();
            expect(chooseTrackMock).toHaveBeenCalled();
            expect(setNextTrackMock).not.toHaveBeenCalled();
        });
    })
})