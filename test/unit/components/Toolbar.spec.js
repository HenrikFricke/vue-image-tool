import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import Toolbar from '../../../src/components/Toolbar';

Vue.use(Vuex);

function getComponent(store, dispatch) {
  const vuexStore = new Vuex.Store(store);

  if (dispatch) {
    vuexStore.dispatch = dispatch;
  }

  return mount(Toolbar, { globals: { $store: vuexStore } });
}

describe('Toolbar', () => {
  let component;
  let hasHistory;
  let hasUndoneFilter;
  let undo;
  let redo;
  let reset;
  let store;
  let preview;
  let storePreview;
  let imageTools;

  beforeEach(() => {
    undo = jasmine.createSpy('undo');
    redo = jasmine.createSpy('redo');
    reset = jasmine.createSpy('reset');
    preview = jasmine.createSpy('preview');
    hasHistory = () => true;
    hasUndoneFilter = () => true;
    storePreview = jasmine.createSpy('storePreview');

    imageTools = [
      {
        ID: 'tool-one',
        MIN_VALUE: 0,
        MAX_VALUE: 100,
        LABEL: 'Tool One',
        STEP: 1,
        DEFAULT_VALUE: 1,
        value: 10,
      },
      {
        ID: 'tool-two',
        MIN_VALUE: 0,
        MAX_VALUE: 100,
        LABEL: 'Tool Two',
        STEP: 1,
        DEFAULT_VALUE: 1,
        value: 20,
      },
    ];

    store = {
      actions: {
        undo,
        redo,
        reset,
        preview,
        storePreview,
      },
      getters: {
        imageTools: () => imageTools,
        hasHistory,
        hasUndoneFilter,
      },
    };

    component = getComponent(store);
  });

  describe('image tools', () => {
    it('should be two present', () => {
      const imageToolsComponents = component.find('.image-tool');

      expect(imageToolsComponents.length).toBe(2);
    });

    it('should render input field with proper attributes', () => {
      const input = component.find('.image-tool > input')[0];

      expect(input.element.value).toEqual(imageTools[0].value.toString());
      expect(input.element.getAttribute('min')).toEqual(imageTools[0].MIN_VALUE.toString());
      expect(input.element.getAttribute('max')).toEqual(imageTools[0].MAX_VALUE.toString());
      expect(input.element.getAttribute('step')).toEqual(imageTools[0].STEP.toString());
      expect(input.element.dataset.tool).toEqual(imageTools[0].ID.toString());
    });

    it('should render label', () => {
      const label = component.find('.image-tool > h3')[0];

      expect(label.text()).toEqual(imageTools[0].LABEL);
    });

    it('should handle input events', () => {
      const dispatch = jasmine.createSpy('dispatch');
      component = getComponent(store, dispatch);
      const input = component.find('.image-tool > input')[0];
      input.trigger('input');

      expect(dispatch).toHaveBeenCalledWith('preview', {
        id: imageTools[0].ID,
        value: imageTools[0].value.toString(),
      });
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
