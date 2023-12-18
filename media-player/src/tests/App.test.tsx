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

    const navbar = screen.getByTestId("NavbarMock");
    const homePage = screen.getByTestId("HomePageMock");
    const copyright = screen.getByTestId("CopyrightMock");
    expect(navbar).toBeInTheDocument();
    expect(homePage).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
  });
  
  
  test('Should render navbar, copyright and instructions page on instructions route', () => {
    render(
      <MemoryRouter initialEntries={['/instructions']}>
        <App/>
      </MemoryRouter>
    );
  
    const navbar = screen.getByTestId("NavbarMock");
    const instructionsPage = screen.getByTestId("InstructionsPageMock");
    const copyright = screen.getByTestId("CopyrightMock");
    expect(navbar).toBeInTheDocument();
    expect(instructionsPage).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
  });
  
  test('Should render navbar, copyright and url parser on media player route', () => {
    render(
      <MemoryRouter initialEntries={['/media-player']}>
        <App/>
      </MemoryRouter>
    );
  
    const navbar = screen.getByTestId("NavbarMock");
    const urlParser = screen.getByTestId("URLParserMock");
    const copyright = screen.getByTestId("CopyrightMock");
    expect(navbar).toBeInTheDocument();
    expect(urlParser).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
  });
})