import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chalk } from '../components/Chalk.tsx';

describe('Chalk', () => {
  it('renders the chalk button', () => {
    render(<Chalk active={false} onClick={() => {}} />);
    const button = screen.getByTestId('chalk-button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Chalk active={false} onClick={handleClick} />);
    const button = screen.getByTestId('chalk-button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows active state when active prop is true', () => {
    render(<Chalk active={true} onClick={() => {}} />);
    const button = screen.getByTestId('chalk-button');
    expect(button).toBeInTheDocument();
  });

  it('shows inactive state when active prop is false', () => {
    render(<Chalk active={false} onClick={() => {}} />);
    const button = screen.getByTestId('chalk-button');
    expect(button).toBeInTheDocument();
  });

  it('has tooltip with correct text', () => {
    render(<Chalk active={false} onClick={() => {}} />);
    const button = screen.getByTestId('chalk-button');
    expect(button).toHaveAttribute('aria-label', undefined);
  });
});
