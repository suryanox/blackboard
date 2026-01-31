import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Blackboard } from '../components/Blackboard.tsx';

describe('Blackboard', () => {
  it('renders the canvas element', () => {
    render(<Blackboard tool="chalk" />);
    const canvas = screen.getByTestId('blackboard-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('canvas has correct dimensions', () => {
    render(<Blackboard tool="chalk" />);
    const canvas = screen.getByTestId('blackboard-canvas') as HTMLCanvasElement;
    expect(canvas.width).toBe(3840);
    expect(canvas.height).toBe(2160);
  });

  it('renders with chalk tool', () => {
    render(<Blackboard tool="chalk" />);
    const canvas = screen.getByTestId('blackboard-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders with duster tool', () => {
    render(<Blackboard tool="duster" />);
    const canvas = screen.getByTestId('blackboard-canvas');
    expect(canvas).toBeInTheDocument();
  });
});
