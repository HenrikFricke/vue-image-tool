export function initialState() {
  return {
    filter: [
      {
        sepia: 0,
        grayscale: 0,
      },
    ],
    redo: [],
  };
}

export default initialState();
