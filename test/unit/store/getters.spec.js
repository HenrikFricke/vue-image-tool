import * as getters from '../../../src/store/getters';
import { initialState } from '../../../src/store/state';

import imageToolsList from '../../../src/imageTools';
import * as sepia from '../../../src/imageTools/sepia';

describe('Getters', () => {
  let state;

  beforeEach(() => {
    state = initialState();
  });

  describe('hasHistory', () => {
    describe('more than one manipulation in history', () => {
      it('should return true', () => {
        state.history.push({
          id: 'sepia',
          value: 20,
        });

        expect(getters.hasHistory(state)).toBeTruthy();
      });
    });

    describe('initial state of history', () => {
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

  describe('imageTools', () => {
    describe('preview given', () => {
      it('should return value of preview', () => {
        state.preview = {
          id: sepia.ID,
          value: 20,
        };

        const imageTools = imageToolsList.map((tool) => {
          if (tool.ID === sepia.ID) {
            return {
              ...tool,
              value: 20,
            };
          }

          return {
            ...tool,
            value: tool.DEFAULT_VALUE,
          };
        });

        expect(getters.imageTools(state)).toEqual(imageTools);
      });
    });

    describe('no preview given, but history given', () => {
      it('should return value of last manipulation in history', () => {
        state.history.push({
          id: sepia.ID,
          value: 20,
        });

        state.history.push({
          id: sepia.ID,
          value: 50,
        });

        const imageTools = imageToolsList.map((tool) => {
          if (tool.ID === sepia.ID) {
            return {
              ...tool,
              value: 50,
            };
          }

          return {
            ...tool,
            value: tool.DEFAULT_VALUE,
          };
        });

        expect(getters.imageTools(state)).toEqual(imageTools);
      });
    });
  });

  describe('imageSource', () => {
    it('should return image source', () => {
      expect(getters.imageSource(state)).toEqual(state.imageSource);
    });
  });
});
