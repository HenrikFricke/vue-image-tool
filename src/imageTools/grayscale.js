export const ID = 'grayscale';
export const LABEL = 'Grayscale';

export const MIN_VALUE = 0;
export const MAX_VALUE = 100;
export const STEP = 1;
export const DEFAULT_VALUE = 0;

export function manipulate(canvasContext, value) {
  if (canvasContext.filter === 'none') {
    // eslint-disable-next-line
    canvasContext.filter = `grayscale(${value}%)`;
    return;
  }

  // eslint-disable-next-line
  canvasContext.filter += ` grayscale(${value}%)`;
}
