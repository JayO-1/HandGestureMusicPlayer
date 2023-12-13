// // hello.test.js

// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

// import { InstructionStep } from "../common/types";
// import InstructionCard from "../InstructionCard";

// let container: any = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it("renders instruction text correctly", () => {
//   const instruction: InstructionStep = {
//     title: "Test Instruction",
//     description: "testing123",
//     imgPath: "",
//     imgWidth: "",
//     imgHeight: "",
//     imgAlt: "no image"
//   }
 
//   act(() => {
//     render(<InstructionCard {...instruction} />, container);
//   });
//   expect(container.textContent).toBe("Test Instructiontesting123");
// });

import React from 'react';
import { render, screen } from '@testing-library/react';

import { InstructionStep } from '../../common/types';
import InstructionCard from "./InstructionCard";


test('renders learn react link', () => {
  const instruction: InstructionStep = {
    title: "Test Instruction",
    description: "testing123",
    imgPath: "",
    imgWidth: "",
    imgHeight: "",
    imgAlt: "no image"
  }
  render(<InstructionCard {...instruction} />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});