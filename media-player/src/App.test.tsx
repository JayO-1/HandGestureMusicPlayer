import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from "./App";

jest.mock('./components/home/Home', () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="HomePageMock" />;
    }
  }
});

jest.mock('./components/navbar/Navbar', () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="NavbarMock" />;
    }
  }
});

jest.mock('./components/copyright/Copyright', () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="CopyrightMock" />;
    }
  }
});

jest.mock('./components/instructions/Instructions', () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="InstructionsPageMock" />;
    }
  }
});

jest.mock('./components/media-player/URLParser', () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="URLParserMock" />;
    }
  }
});

describe('App', () => {
  test('Should render navbar, copyright and home page on default route', () => {
    render(
    <MemoryRouter>
      <App/>
    </MemoryRouter>
    );
  
    expect(screen.getByTestId("NavbarMock")).toBeInTheDocument();
    expect(screen.getByTestId("HomePageMock")).toBeInTheDocument();
    expect(screen.getByTestId("CopyrightMock")).toBeInTheDocument();
  });
  
  
  test('Should render navbar, copyright and instructions page on instructions route', () => {
    render(
      <MemoryRouter initialEntries={['/instructions']}>
        <App/>
      </MemoryRouter>
    );
  
    expect(screen.getByTestId("NavbarMock")).toBeInTheDocument();
    expect(screen.getByTestId("InstructionsPageMock")).toBeInTheDocument();
    expect(screen.getByTestId("CopyrightMock")).toBeInTheDocument();
  });
  
  test('Should render navbar, copyright and url parser on media player route', () => {
    render(
      <MemoryRouter initialEntries={['/media-player']}>
        <App/>
      </MemoryRouter>
    );
  
    expect(screen.getByTestId("NavbarMock")).toBeInTheDocument();
    expect(screen.getByTestId("URLParserMock")).toBeInTheDocument();
    expect(screen.getByTestId("CopyrightMock")).toBeInTheDocument();
  });
})