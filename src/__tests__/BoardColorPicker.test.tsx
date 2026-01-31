import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BoardColorPicker } from '../components/BoardColorPicker.tsx';

describe('BoardColorPicker', () => {
  it('renders green and black color options', () => {
    render(<BoardColorPicker activeColor="green" onColorChange={() => {}} />);
    expect(screen.getByTestId('board-color-green')).toBeInTheDocument();
    expect(screen.getByTestId('board-color-black')).toBeInTheDocument();
  });

  it('calls onColorChange when a color is clicked', () => {
    const handleChange = vi.fn();
    render(<BoardColorPicker activeColor="green" onColorChange={handleChange} />);
    const blackButton = screen.getByTestId('board-color-black');
    fireEvent.click(blackButton);
    expect(handleChange).toHaveBeenCalledWith('black');
  });

  it('calls onColorChange with green when green is clicked', () => {
    const handleChange = vi.fn();
    render(<BoardColorPicker activeColor="black" onColorChange={handleChange} />);
    const greenButton = screen.getByTestId('board-color-green');
    fireEvent.click(greenButton);
    expect(handleChange).toHaveBeenCalledWith('green');
  });
});
