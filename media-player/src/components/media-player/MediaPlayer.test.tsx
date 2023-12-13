import React from 'react';
import { render, screen } from '@testing-library/react';

import { InstructionStep } from '../../common/types';
// import InstructionCard from "./InstructionCard";

test('renders learn react link', () => {
    const instruction: InstructionStep = {
      title: "Test Instruction",
      description: "testing123",
      imgPath: "",
      imgWidth: "",
      imgHeight: "",
      imgAlt: "no image"
    }
    // render(<InstructionCard {...instruction} />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });