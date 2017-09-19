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
  let hasUndoneFilter;
  let undo;
  let redo;
  let reset;
  let store;

  beforeEach(() => {
    undo = jest.fn();
    redo = jest.fn();
    reset = jest.fn();
    hasHistory = jest.fn(() => true);
    hasUndoneFilter = jest.fn(() => true);

    store = {
      actions: {
        undo,
        redo,
        reset,
      },
      getters: {
        hasHistory,
        hasUndoneFilter,
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
    let redoButton;

    beforeEach(() => {
      redoButton = component.find('button.redo')[0];
    });

    it('should call redo action', () => {
      redoButton.trigger('click');

      expect(redo).toHaveBeenCalled();
    });

    describe('no undone filter given', () => {
      it('should be disabled', () => {
        hasUndoneFilter.mockImplementationOnce(() => false);
        component = getComponent(store);
        redoButton = component.find('button.redo')[0];

        expect(redoButton.element.getAttribute('disabled')).toEqual('disabled');
      });
    });

    describe('undone filter given', () => {
      it('should not be disabled', () => {
        expect(redoButton.element.getAttribute('disabled')).toBeNull();
      });
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
