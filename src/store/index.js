import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import state from './state';

import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
});
