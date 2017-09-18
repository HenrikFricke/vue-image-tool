export function sepia(state) {
  return state.filter[state.filter.length - 1].sepia;
}

export function grayscale(state) {
  return state.filter[state.filter.length - 1].grayscale;
}
