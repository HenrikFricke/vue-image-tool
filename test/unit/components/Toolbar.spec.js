import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import Toolbar from '../../../src/components/Toolbar';

Vue.use(Vuex);

describe('Toolbar', () => {
  let component;
  let undo;
  let redo;
  let reset;

  beforeEach(() => {
    undo = jest.fn();
    redo = jest.fn();
    reset = jest.fn();

    const store = new Vuex.Store({
      actions: {
        undo,
        redo,
        reset,
      },
    });
    component = mount(Toolbar, { globals: { $store: store } });
  });

  describe('undo button', () => {
    it('should call undo action', () => {
      component.find('button.undo')[0].trigger('click');

      expect(undo).toHaveBeenCalled();
    });
  });

  describe('redo button', () => {
    it('should call redo action', () => {
      component.find('button.redo')[0].trigger('click');

      expect(redo).toHaveBeenCalled();
    });
  });

  describe('reset button', () => {
    it('should call reset action', () => {
      component.find('button.reset')[0].trigger('click');

      expect(reset).toHaveBeenCalled();
    });
  });
});
