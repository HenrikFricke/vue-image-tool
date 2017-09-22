export const ID = 'sepia';
export const LABEL = 'Sepia';

export const MIN_VALUE = 0;
export const MAX_VALUE = 100;
export const STEP = 1;
export const DEFAULT_VALUE = 0;

export function manipulate(canvasContext, value) {
  if (canvasContext.filter === 'none') {
    // eslint-disable-next-line
    canvasContext.filter = `sepia(${value}%)`;
    return;
  }

  // eslint-disable-next-line
  canvasContext.filter += ` sepia(${value}%)`;
}
