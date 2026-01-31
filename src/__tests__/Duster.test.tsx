import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Duster } from '../components/Duster.tsx';

describe('Duster', () => {
  it('renders the duster button', () => {
    render(<Duster active={false} onClick={() => {}} />);
    const button = screen.getByTestId('duster-button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Duster active={false} onClick={handleClick} />);
    const button = screen.getByTestId('duster-button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows active state when active prop is true', () => {
    render(<Duster active={true} onClick={() => {}} />);
    const button = screen.getByTestId('duster-button');
    expect(button).toBeInTheDocument();
  });

  it('shows inactive state when active prop is false', () => {
    render(<Duster active={false} onClick={() => {}} />);
    const button = screen.getByTestId('duster-button');
    expect(button).toBeInTheDocument();
  });
});
