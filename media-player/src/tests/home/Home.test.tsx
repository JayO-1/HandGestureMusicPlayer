import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Home from '../../components/home/Home';

describe('Home', () => {
  test('Should render welcome message, login button and instructions page button', () => {
    const authURL = "auth/url/spotify.com";

    const welcomeMsg = {
        line1: "Hello, my name is Jason Ozuzu and this is my Final Year Project at the University of Manchester. This is a media player for Spotify that will allow you to control playback using only hand gestures!",
        line2: "Click one of the buttons below to log into your Spotify account and begin, or view the instructions",
        line3: "Note that a premium account is needed for full functionality"
    }
  
    render(
    <MemoryRouter>
      <Home authURL={authURL} />
    </MemoryRouter>
    );

    const welcomeMsg1 = screen.getByText(welcomeMsg.line1);
    const welcomeMsg2 = screen.getByText(welcomeMsg.line2);
    const welcomeMsg3 = screen.getByText(welcomeMsg.line3);
    const loginButton = screen.getByRole("link", { name: "login" });
    const instructionsButton = screen.getByRole("button", { name: "instructions" });
    expect(welcomeMsg1).toBeInTheDocument();
    expect(welcomeMsg2).toBeInTheDocument();
    expect(welcomeMsg3).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(instructionsButton).toBeInTheDocument();
  });

  test('Should render login button with correct href', () => {
    const authURL = "auth/url/spotify.com";

    render(
    <MemoryRouter>
      <Home authURL={authURL} />
    </MemoryRouter>
    );

    const loginButton = screen.getByRole("link", { name: "login" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', authURL);
  });

  test('Instructions button should send user to instructions page', async () => {
    const authURL = "auth/url/spotify.com";
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
    <Router history={history}>
      <Home authURL={authURL} />
    </Router>
    );

    const instructionsButton = screen.getByRole("button", { name: "instructions" });
    fireEvent.click(instructionsButton);

    expect(instructionsButton).toBeInTheDocument();

    // spy on push calls, assert on url (parameter)
    expect(history.push).toHaveBeenCalledWith('/instructions');
  });
})