import React from 'react';
import { render, screen } from '@testing-library/react';

import Dashboard from './Dashboard';
import MediaPlayer from './MediaPlayer';

jest.mock("./Dashboard", () => {
    return {
      __esModule: true,
      default: () => {
        return <div data-testid="DashboardMock" />;
      }
    }
});

describe('MediaPlayer', () => {
    test('Should render Dashboard if code is included in url', () => {
        const code = '123';

        render(
        <MediaPlayer code={code}/>
        );

        const dashboard = screen.getByTestId("DashboardMock");
        expect(dashboard).toBeInTheDocument();
    });

    test('Should render error message if code isn\'t included in url', () => {
        const code = null;

        render(
        <MediaPlayer code={code}/>
        );

        const errorMsg = screen.getByText("Error");
        expect(errorMsg).toBeInTheDocument();
    });
})