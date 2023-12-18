import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Navbar from '../../components/navbar/Navbar';

describe('Navbar', () => {
  test('Should render header, login button and instructions page button', () => {
    const authURL = "auth/url/spotify.com";
    const headerText = "Hand Gesture Media Player";
  
    render(
    <MemoryRouter>
      <Navbar authURL={authURL} />
    </MemoryRouter>
    );

    const header = screen.getByText(headerText);
    const loginButton = screen.getByRole("link", { name: "login" });
    const instructionsButton = screen.getByRole("button", { name: "instructions" });
    expect(header).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(instructionsButton).toBeInTheDocument();
  });

  test('Should render login button with correct href', () => {
    const authURL = "auth/url/spotify.com";

    render(
    <MemoryRouter>
      <Navbar authURL={authURL} />
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
      <Navbar authURL={authURL} />
    </Router>
    );

    const instructionsButton = screen.getByRole("button", { name: "instructions" });
    fireEvent.click(instructionsButton);

    expect(instructionsButton).toBeInTheDocument();

    // spy on push calls, assert on url (parameter)
    expect(history.push).toHaveBeenCalledWith('/instructions');
  });
})