import React from 'react';
import { render, screen } from '@testing-library/react';

import Copyright from './Copyright';

describe('Copyright', () => {
  test('Should render copyright with current year', () => {
    const copyrightMsg: string = `Copyright © Jason Ozuzu ${new Date().getFullYear()}.`;
  
    render(<Copyright />);

    const copyright = screen.getByText(copyrightMsg);
    expect(copyright).toBeInTheDocument();
  });
})