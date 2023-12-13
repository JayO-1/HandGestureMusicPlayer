import React from 'react';
import { render, screen } from '@testing-library/react';

import { InstructionStep } from '../../common/types';
import InstructionCard from './InstructionCard';

describe('InstructionCard', () => {
  test('Should render instruction card that has no image', () => {
    const instruction: InstructionStep = {
      title: 'Test Instruction',
      description: 'testing123',
      imgPath: '',
      imgWidth: '',
      imgHeight: '',
      imgAlt: 'no image'
    }
  
    render(<InstructionCard {...instruction} />);
    const instructionTitle = screen.getByText(instruction.title);
    const instructionDescription = screen.getByText(instruction.description);
    const instructionImg = screen.getByAltText(instruction.imgAlt);
    
    expect(instructionTitle).toBeInTheDocument();
    expect(instructionDescription).toBeInTheDocument();
    expect(instructionImg).toBeInTheDocument();
  });
  
  test('Should render instruction card with image', () => {
    const instruction: InstructionStep = {
      title: 'Test Instruction',
      description: 'testing123',
      imgPath: `${process.env.PUBLIC_URL}/assets/images/spotify_logo.png`,
      imgWidth: '',
      imgHeight: '',
      imgAlt: 'no image'
    }
  
    render(<InstructionCard {...instruction} />);
    const instructionTitle = screen.getByText(instruction.title);
    const instructionDescription = screen.getByText(instruction.description);
    const instructionImg = screen.getByAltText(instruction.imgAlt);
  
    expect(instructionTitle).toBeInTheDocument();
    expect(instructionDescription).toBeInTheDocument();
    expect(instructionImg).toHaveAttribute('src', instruction.imgPath);
  });
})