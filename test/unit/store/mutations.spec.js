import { preview, update, updateImageSource, undo, redo, reset, storePreview } from '../../../src/store/mutations';
import { initialState } from '../../../src/store/state';

describe('Mutations', () => {
  let state;

  beforeEach(() => {
    state = initialState();
  });

  describe('Preview', () => {
    it('should set manipulation as preview', () => {
      const manipulation = {
        id: 'sepia',
        value: 100,
      };

      preview(state, manipulation);
      expect(state.preview).toEqual(manipulation);
    });

    it('should clean up redo array', () => {
      state.redo.push({});

      preview(state, {
        id: 'sepia',
        value: 100,
      });

      expect(state.redo.length).toBe(0);
    });
  });

  describe('Update', () => {
    it('should append manipulation to history', () => {
      const manipulation = {
        id: 'sepia',
        value: 100,
      };

      update(state, manipulation);
      const lastManipulation = state.history[state.history.length - 1];

      expect(state.history.length).toBe(1);
      expect(lastManipulation).toEqual(manipulation);
    });

    it('should empty redo array', () => {
      state.redo.push({});

      update(state, {
        property: 'sepia',
        value: 100,
      });

      expect(state.redo.length).toBe(0);
    });
  });

  describe('UpdateImageSource', () => {
    it('should update image source', () => {
      const payload = {
        imageSource: 'path/to/image',
      };

      updateImageSource(state, payload);

      expect(state.imageSource).toEqual(payload.imageSource);
    });
  });

  describe('Undo', () => {
    it('should remove last manipulation in history', () => {
      update(state, {
        id: 'sepia',
        value: 100,
      });

      const secondManipulation = {
        id: 'sepia',
        value: 50,
      };

      update(state, secondManipulation);

      undo(state);

      expect(state.history.length).toBe(1);
      expect(state.redo[0]).toEqual(secondManipulation);
    });
  });

  describe('Redo', () => {
    it('should redo last manipulation', () => {
      const manipulation = {
        id: 'sepia',
        vvalue: 80,
      };
      state.redo.push(manipulation);
      redo(state);

      expect(state.history.length).toBe(1);
      expect(state.redo.length).toBe(0);
    });
  });

  describe('Reset', () => {
    it('should reset time travel', () => {
      const initState = initialState();

      update(state, {
        property: 'sepia',
        value: 100,
      });

      reset(state);

      expect(state.history).toEqual(initState.history);
      expect(state.redo).toEqual(initState.redo);
      expect(state.preview).toEqual(initState.preview);
    });
  });

  describe('StorePreview', () => {
    it('should reset state to initial state', () => {
      const previewManipulation = {
        id: 'sepia',
        value: 20,
      };

      state.preview = previewManipulation;

      storePreview(state);

      expect(state.preview).toBeNull();
      expect(state.history[state.history.length - 1]).toEqual(previewManipulation);
    });
  });
});
