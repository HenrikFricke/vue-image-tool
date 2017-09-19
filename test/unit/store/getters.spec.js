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

  describe('sepia', () => {
    it('should return sepia value of last filter', () => {
      expect(getters.sepia(state)).toEqual(state.filter[0].sepia);
    });
  });

  describe('grayscale', () => {
    it('should return grayscale value of last filter', () => {
      expect(getters.sepia(state)).toEqual(state.filter[0].grayscale);
    });
  });
});
