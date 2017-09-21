import * as getters from '../../../src/store/getters';
import { initialState } from '../../../src/store/state';

describe('Getters', () => {
  let state;

  beforeEach(() => {
    state = initialState();
  });

  describe('hasHistory', () => {
    describe('more than one element in filter array given', () => {
      it('should return true', () => {
        const lastFilter = state.filter[0];
        state.filter.push(lastFilter);

        expect(getters.hasHistory(state)).toBeTruthy();
      });
    });

    describe('initial state of filter array given', () => {
      it('should return false', () => {
        expect(getters.hasHistory(state)).toBeFalsy();
      });
    });
  });

  describe('hasUndoneFilter', () => {
    describe('more than one element in redo array given', () => {
      it('should return true', () => {
        state.redo.push({});

        expect(getters.hasUndoneFilter(state)).toBeTruthy();
      });
    });

    describe('has nothing in redo array', () => {
      it('should return false', () => {
        expect(getters.hasUndoneFilter(state)).toBeFalsy();
      });
    });
  });

  describe('imageFilter', () => {
    describe('no preview given', () => {
      it('should return sepia value of last filter', () => {
        expect(getters.imageFilter(state, 'sepia')).toEqual(state.filter[0].sepia);
      });
    });

    describe('preview given', () => {
      it('should return sepia value of preview', () => {
        state.preview = {
          sepia: 50,
        };

        expect(getters.imageFilter(state, 'sepia')).toEqual(state.preview.sepia);
      });
    });
  });

  describe('imageSource', () => {
    it('should return image source', () => {
      expect(getters.imageSource(state)).toEqual(state.imageSource);
    });
  });
});
