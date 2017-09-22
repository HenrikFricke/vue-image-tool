import Vue from 'vue';

import { initialState } from './state';

import * as types from './mutation-types';

export function preview(state, payload) {
  Vue.set(state, 'redo', []);
  Vue.set(state, 'preview', payload);
}

export function update(state, payload) {
  state.history.push(payload);
  state.redo.splice(0, state.redo.length + 1);
}

export function updateImageSource(state, payload) {
  Vue.set(state, 'imageSource', payload.imageSource);
}

export function undo(state) {
  if (state.history.length > 0) {
    const lastManipulation = state.history.pop();
    state.redo.push(lastManipulation);
  }
}

export function redo(state) {
  if (state.redo.length > 0) {
    const lastManipulation = state.redo.pop();
    state.history.push(lastManipulation);
  }
}

export function reset(state) {
  const initState = initialState();

  Vue.set(state, 'history', initState.history);
  Vue.set(state, 'redo', initState.redo);
  Vue.set(state, 'preview', initState.preview);
}

export function storePreview(state) {
  state.history.push(state.preview);
  Vue.set(state, 'preview', null);
}

export default {
  [types.PREVIEW]: preview,
  [types.UPDATE]: update,
  [types.UPDATE_IMAGE_SOURCE]: updateImageSource,
  [types.UNDO]: undo,
  [types.REDO]: redo,
  [types.RESET]: reset,
  [types.STORE_PREVIEW]: storePreview,
};
