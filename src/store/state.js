export function initialState() {
  return {
    filter: [
      {
        sepia: 0,
        grayscale: 0,
      },
    ],
    redo: [],
    preview: null,
  };
}

export default initialState();
