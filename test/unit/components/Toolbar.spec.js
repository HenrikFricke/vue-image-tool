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
  let grayscale;
  let hasHistory;
  let hasUndoneFilter;
  let undo;
  let redo;
  let reset;
  let store;
  let sepia;
  let preview;
  let storePreview;

  beforeEach(() => {
    grayscale = () => 30;
    undo = jasmine.createSpy('undo');
    redo = jasmine.createSpy('redo');
    reset = jasmine.createSpy('reset');
    sepia = () => 50;
    preview = jasmine.createSpy('preview');
    hasHistory = () => true;
    hasUndoneFilter = () => true;
    storePreview = jasmine.createSpy('storePreview');

    store = {
      actions: {
        undo,
        redo,
        reset,
        preview,
        storePreview,
      },
      getters: {
        grayscale,
        sepia,
        hasHistory,
        hasUndoneFilter,
      },
    };

    component = getComponent(store);
  });

  describe('grayscale input range', () => {
    it('should have proper value attribute', () => {
      const grayscaleRange = component.find('.grayscale-range')[0];

      expect(grayscaleRange.element.value).toBe('30');
    });

    it('should call preview on change', () => {
      const grayscaleRange = component.find('.grayscale-range')[0];
      grayscaleRange.trigger('input');
      const payload = preview.calls.mostRecent().args[1];

      expect(payload).toEqual({
        property: 'grayscale',
        value: '30',
      });
    });

    it('should call storePreview on mouseup', () => {
      const grayscaleRange = component.find('.grayscale-range')[0];
      grayscaleRange.trigger('mouseup');

      expect(storePreview).toHaveBeenCalled();
    });
  });

  describe('sepia input range', () => {
    it('should have proper value attribute', () => {
      const sepiaRange = component.find('.sepia-range')[0];

      expect(sepiaRange.element.value).toBe('50');
    });

    it('should call preview on change', () => {
      const sepiaRange = component.find('.sepia-range')[0];
      sepiaRange.trigger('input');
      const payload = preview.calls.mostRecent().args[1];

      expect(payload).toEqual({
        property: 'sepia',
        value: '50',
      });
    });

    it('should call storePreview on mouseup', () => {
      const sepiaRange = component.find('.sepia-range')[0];
      sepiaRange.trigger('mouseup');

      expect(storePreview).toHaveBeenCalled();
    });
  });

  describe('grayscale input range', () => {
    it('should have proper value attribute', () => {
      const grayscaleRange = component.find('.grayscale-range')[0];

      expect(grayscaleRange.element.value).toBe('30');
    });
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
        store.getters.hasHistory = jasmine.createSpy('hasHistory').and.returnValue(false);
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
        store.getters.hasUndoneFilter = () => false;
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
        store.getters.hasHistory = () => false;
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
