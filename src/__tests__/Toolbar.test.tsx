import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toolbar } from '../components/Toolbar.tsx';

describe('Toolbar', () => {
  const defaultProps = {
    activeTool: 'chalk' as const,
    onToolChange: vi.fn(),
  };

  it('renders the toolbar', () => {
    render(<Toolbar {...defaultProps} />);
    const toolbar = screen.getByTestId('toolbar');
    expect(toolbar).toBeInTheDocument();
  });

  it('renders both chalk and duster buttons', () => {
    render(<Toolbar {...defaultProps} />);
    expect(screen.getByTestId('chalk-button')).toBeInTheDocument();
    expect(screen.getByTestId('duster-button')).toBeInTheDocument();
  });

  it('calls onToolChange with chalk when chalk is clicked', () => {
    const handleToolChange = vi.fn();
    render(<Toolbar {...defaultProps} activeTool="duster" onToolChange={handleToolChange} />);
    const chalkButton = screen.getByTestId('chalk-button');
    fireEvent.click(chalkButton);
    expect(handleToolChange).toHaveBeenCalledWith('chalk');
  });

  it('calls onToolChange with duster when duster is clicked', () => {
    const handleToolChange = vi.fn();
    render(<Toolbar {...defaultProps} onToolChange={handleToolChange} />);
    const dusterButton = screen.getByTestId('duster-button');
    fireEvent.click(dusterButton);
    expect(handleToolChange).toHaveBeenCalledWith('duster');
  });
});
