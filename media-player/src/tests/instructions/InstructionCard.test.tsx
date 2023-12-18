import React from 'react';
import { render, screen } from '@testing-library/react';

import { InstructionStep } from '../../common/types';
import InstructionCard from '../../components/instructions/InstructionCard';

describe('InstructionCard', () => {
  test('Should render instruction card with image', () => {
    const instruction: InstructionStep = {
      title: 'Test Instruction',
      description: 'testing123',
      imgPath: 'https://google/playlist/img.png',
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
    expect(instructionImg).toHaveAttribute('src', instruction.imgPath);
  });

  test('Should render instruction card with no image', () => {
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
    expect(instructionImg).not.toHaveAttribute('src', instruction.imgPath);
  });
})