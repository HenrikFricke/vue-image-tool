import * as types from '../../../src/store/mutation-types';
import * as actions from '../../../src/store/actions';

describe('Actions', () => {
  let commitSpy;

  beforeEach(() => {
    commitSpy = jest.fn();
  });

  describe('Update', () => {
    it('should commit update mutation', () => {
      const payload = {
        property: 'value',
      };

      actions.update({ commit: commitSpy }, payload);
      expect(commitSpy).toHaveBeenCalledWith(types.UPDATE, payload);
    });
  });

  describe('Redo', () => {
    it('should commit redo mutation', () => {
      actions.redo({ commit: commitSpy });
      expect(commitSpy).toHaveBeenCalledWith(types.REDO);
    });
  });

  describe('Undo', () => {
    it('should commit undo mutation', () => {
      actions.undo({ commit: commitSpy });
      expect(commitSpy).toHaveBeenCalledWith(types.UNDO);
    });
  });

  describe('Reset', () => {
    it('should commit reset mutation', () => {
      actions.reset({ commit: commitSpy });
      expect(commitSpy).toHaveBeenCalledWith(types.RESET);
    });
  });
});
