import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App.tsx';

describe('App', () => {
  it('renders the app container', () => {
    render(<App />);
    const container = screen.getByTestId('app-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the blackboard', () => {
    render(<App />);
    const canvas = screen.getByTestId('blackboard-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders the toolbar', () => {
    render(<App />);
    const toolbar = screen.getByTestId('toolbar');
    expect(toolbar).toBeInTheDocument();
  });

  it('switches to duster tool when duster is clicked', () => {
    render(<App />);
    const dusterButton = screen.getByTestId('duster-button');
    fireEvent.click(dusterButton);
    expect(dusterButton).toBeInTheDocument();
  });

  it('switches board color when color option is clicked', () => {
    render(<App />);
    const blackButton = screen.getByTestId('board-color-black');
    fireEvent.click(blackButton);
    expect(blackButton).toBeInTheDocument();
  });

  it('renders board color picker', () => {
    render(<App />);
    expect(screen.getByTestId('board-color-green')).toBeInTheDocument();
    expect(screen.getByTestId('board-color-black')).toBeInTheDocument();
  });
});
