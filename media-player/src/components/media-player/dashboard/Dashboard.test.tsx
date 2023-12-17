import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import axios from 'axios';
import Dashboard from './Dashboard';

jest.mock('axios');

jest.mock("./Player", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="PlayerMock" />;
    }
  }
});

jest.mock("./GestureControl", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="GestureControlMock" />;
    }
  }
});

// To understand usage of act, refer to: https://callstack.github.io/react-native-testing-library/docs/understanding-act

describe('Dashboard', () => {
    test('Should render searchbar, playback controller and gesture controller on initial page load', async () => {
      const code = '123';

      const authCodes = {
        data: {
          accessToken: '123',
          refreshToken: '456',
          expiresIn: '60'
        }
      };

      axios.post = jest.fn().mockResolvedValue(authCodes);

      await act(async () => {
        render(
      <Dashboard code={code}/>)
      });

      const searchBar = screen.getByPlaceholderText("Search Songs");
      const player = screen.getByTestId("PlayerMock");
      const gestureControl = screen.getByTestId("GestureControlMock");
      expect(searchBar).toBeInTheDocument();
      expect(player).toBeInTheDocument();
      expect(gestureControl).toBeInTheDocument();
    });

    test('Should render search results if the user searches for a song that Spotify provides', async () => {
      const code = '123';

      const authCodes = {
        data: {
          accessToken: '123',
          refreshToken: '456',
          expiresIn: '60'
        }
      };

      axios.post = jest.fn().mockResolvedValue(authCodes);

      await act(async () => {
        render(
      <Dashboard code={code}/>)
      });

      const song = {
        data: {
          body: {
            tracks: {
              items: [{
                artists: [{name: 'John'}],
                name: 'Sunshine',
                uri: '123',
                album: {
                  images: [{url: 'https://google/album-img.png'}]
                }
              }]
            }
          }
        }
      };

      axios.post = jest.fn().mockResolvedValue(song);

      const searchQuery = 'Sunshine';
      const searchBar = screen.getByPlaceholderText("Search Songs");
      await act(async () => {
        fireEvent.change(searchBar, { target: { value: searchQuery } });
      });

      const searchResult = screen.getByText(searchQuery);
      expect(searchResult).toBeInTheDocument();
    });
    
    test('Should not render any search results if the user searches for a song not on Spotify', async () => {
      const code = '123';

      const authCodes = {
        data: {
          accessToken: '123',
          refreshToken: '456',
          expiresIn: '60'
        }
      };

      axios.post = jest.fn().mockResolvedValue(authCodes);

      await act(async () => {
        render(
      <Dashboard code={code}/>)
      });

      const song = {
        data: {
          body: {
            tracks: {
              items: []
            }
          }
        }
      };

      axios.post = jest.fn().mockResolvedValue(song);

      const searchQuery = 'xbaexs';
      const searchBar = screen.getByPlaceholderText("Search Songs");
      await act(async () => {
        fireEvent.change(searchBar, { target: { value: searchQuery } });
      });

      const searchResult = screen.queryByText(searchQuery);
      expect(searchResult).not.toBeInTheDocument();
    });
})