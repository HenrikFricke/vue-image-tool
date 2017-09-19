export function hasHistory(state) {
  return state.filter.length > 1;
}

export function hasUndoneFilter(state) {
  return state.redo.length > 0;
}

export function imageFilter(state, type) {
  if (state.preview && state.preview[type]) {
    return state.preview[type];
  }

  return state.filter[state.filter.length - 1][type];
}

export function sepia(state) {
  return imageFilter(state, 'sepia');
}

export function grayscale(state) {
  return imageFilter(state, 'grayscale');
}
