export function hasHistory(state) {
  return state.filter.length > 1;
}

export function hasUndoneFilter(state) {
  return state.redo.length > 0;
}

export function sepia(state) {
  return state.filter[state.filter.length - 1].sepia;
}

export function grayscale(state) {
  return state.filter[state.filter.length - 1].grayscale;
}
