import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import Toolbar from '../../../src/components/Toolbar';

Vue.use(Vuex);

function getComponent(store) {
  return mount(Toolbar, { globals: { $store: new Vuex.Store(store) } });
}

describe('Toolbar', () => {
  let component;
  let hasHistory;
  let undo;
  let redo;
  let reset;
  let store;

  beforeEach(() => {
    undo = jest.fn();
    redo = jest.fn();
    reset = jest.fn();
    hasHistory = jest.fn(() => true);

    store = {
      actions: {
        undo,
        redo,
        reset,
      },
      getters: {
        hasHistory,
      },
    };

    component = getComponent(store);
  });

  describe('undo button', () => {
    let undoButton;

    beforeEach(() => {
      undoButton = component.find('button.undo')[0];
    });

    it('should call undo action', () => {
      undoButton.trigger('click');

      expect(undo).toHaveBeenCalled();
    });

    describe('no history given in filter array', () => {
      it('should be disabled', () => {
        hasHistory.mockImplementationOnce(() => false);
        component = getComponent(store);
        undoButton = component.find('button.undo')[0];

        expect(undoButton.element.getAttribute('disabled')).toEqual('disabled');
      });
    });

    describe('history given in filter array', () => {
      it('should not be disabled', () => {
        expect(undoButton.element.getAttribute('disabled')).toBeNull();
      });
    });
  });

  describe('redo button', () => {
    it('should call redo action', () => {
      component.find('button.redo')[0].trigger('click');

      expect(redo).toHaveBeenCalled();
    });
  });

  describe('reset button', () => {
    let resetButton;

    beforeEach(() => {
      resetButton = component.find('button.reset')[0];
    });

    it('should call reset action', () => {
      resetButton.trigger('click');

      expect(reset).toHaveBeenCalled();
    });

    describe('no history given in filter array', () => {
      it('should be disabled', () => {
        hasHistory.mockImplementationOnce(() => false);
        component = getComponent(store);
        resetButton = component.find('button.reset')[0];

        expect(resetButton.element.getAttribute('disabled')).toEqual('disabled');
      });
    });

    describe('history given in filter array', () => {
      it('should not be disabled', () => {
        expect(resetButton.element.getAttribute('disabled')).toBeNull();
      });
    });
  });
});
