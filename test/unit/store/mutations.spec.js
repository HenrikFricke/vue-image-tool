import { update, undo, redo, reset } from '../../../src/store/mutations';
import { initialState } from '../../../src/store/state';

describe('Mutations', () => {
  let state;

  beforeEach(() => {
    state = initialState();
  });

  describe('Update', () => {
    it('should add new filter configuration to array', () => {
      update(state, {
        property: 'sepia',
        value: 100,
      });
      const lastFilter = state.filter[state.filter.length - 1];

      expect(state.filter.length).toBe(2);
      expect(lastFilter.sepia).toBe(100);
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

  describe('Undo', () => {
    it('should remove last filter and add it to the redo array', () => {
      const initialFilter = state.filter[0];

      update(state, {
        property: 'sepia',
        value: 100,
      });

      const lastFilter = state.filter[state.filter.length - 1];

      undo(state);

      expect(state.filter[state.filter.length - 1]).toEqual(initialFilter);
      expect(state.redo[0]).toEqual(lastFilter);
    });

    it('should do nothing with only one item in filter array', () => {
      undo(state);

      expect(state).toEqual(initialState());
    });
  });

  describe('Redo', () => {
    it('should redo last filter', () => {
      const redoFilter = {
        sepia: 50,
      };
      state.redo.push(redoFilter);
      redo(state);

      expect(state.filter[state.filter.length - 1]).toEqual(redoFilter);
      expect(state.redo.length).toBe(0);
    });
  });

  describe('Reset', () => {
    it('should reset state to initial state', () => {
      update(state, {
        property: 'sepia',
        value: 100,
      });

      reset(state);

      expect(state).toEqual(initialState());
    });
  });
});
