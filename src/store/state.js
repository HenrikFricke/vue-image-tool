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
    imageSource: 'static/image.jpg',
  };
}

export default initialState();
