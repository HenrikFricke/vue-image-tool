import Vue from 'vue';

import { initialState } from './state';

import * as types from './mutation-types';

export function update(state, payload) {
  state.filter.push({
    ...state.filter[state.filter.length - 1],
    [payload.property]: payload.value,
  });
  state.redo.splice(0, state.redo.length + 1);
}

export function undo(state) {
  if (state.filter.length > 1) {
    const lastFilter = state.filter.pop();
    state.redo.push(lastFilter);
  }
}

export function redo(state) {
  if (state.redo.length > 0) {
    const lastFilter = state.redo.pop();
    state.filter.push(lastFilter);
  }
}

export function reset(state) {
  const initState = initialState();
  Object.keys(state).forEach((f) => {
    Vue.set(state, f, initState[f]);
  });
}

export default {
  [types.UPDATE]: update,
  [types.UNDO]: undo,
  [types.REDO]: redo,
  [types.RESET]: reset,
};
