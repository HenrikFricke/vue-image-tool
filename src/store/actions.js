import * as types from './mutation-types';

export function update({ commit }, payload) {
  commit(types.UPDATE, payload);
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
