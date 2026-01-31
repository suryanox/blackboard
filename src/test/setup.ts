import '@testing-library/jest-dom';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

const canvasContextMock: CanvasRenderingContext2D = {
  fillStyle: '',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  save: () => {},
  restore: () => {},
  clearRect: () => {},
} as unknown as CanvasRenderingContext2D;

const getContextMock: HTMLCanvasElement['getContext'] = (contextId) => {
  if (contextId === '2d') {
    return canvasContextMock;
  }
  return null;
};

HTMLCanvasElement.prototype.getContext = getContextMock;
