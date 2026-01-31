import '@testing-library/jest-dom';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

HTMLCanvasElement.prototype.getContext = () => ({
  fillStyle: '',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  save: () => {},
  restore: () => {},
  clearRect: () => {},
}) as unknown as CanvasRenderingContext2D;
