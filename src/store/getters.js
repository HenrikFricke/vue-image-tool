import imageToolsList from '../imageTools';

export function hasHistory(state) {
  return state.history.length > 0;
}

export function hasUndoneFilter(state) {
  return state.redo.length > 0;
}

export function imageTools(state) {
  return imageToolsList.map((imageTool) => {
    if (state.preview && state.preview.id === imageTool.ID) {
      return {
        ...imageTool,
        value: state.preview.value,
      };
    }

    const history = state.history.filter(manipulation => manipulation.id === imageTool.ID);
    if (history.length > 0) {
      return {
        ...imageTool,
        value: history[history.length - 1].value,
      };
    }

    return {
      ...imageTool,
      value: imageTool.DEFAULT_VALUE,
    };
  });
}

export function imageSource(state) {
  return state.imageSource;
}
