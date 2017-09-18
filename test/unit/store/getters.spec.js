import * as getters from '../../../src/store/getters';
import { initialState } from '../../../src/store/state';

describe('Getters', () => {
  let state;

  beforeEach(() => {
    state = initialState();
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
