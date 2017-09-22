import * as types from './mutation-types';

export function preview({ commit }, payload) {
  commit(types.PREVIEW, payload);
}

export function update({ commit }, payload) {
  commit(types.UPDATE, payload);
}

export function updateImageSource({ commit }, payload) {
  commit(types.UPDATE_IMAGE_SOURCE, payload);
}

export function undo({ commit }) {
  commit(types.UNDO);
}

export function redo({ commit }) {
  commit(types.REDO);
}

export function reset({ commit }) {
  commit(types.RESET);
}

export function storePreview({ commit }) {
  commit(types.STORE_PREVIEW);
}
