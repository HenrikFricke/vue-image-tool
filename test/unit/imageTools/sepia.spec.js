import * as sepia from '../../../src/imageTools/sepia';

describe('ImageTool: Sepia', () => {
  it('should have an ID', () => {
    expect(sepia.ID).toBe('sepia');
  });

  it('should have a label', () => {
    expect(sepia.LABEL).toBe('Sepia');
  });

  it('should have min value', () => {
    expect(sepia.MIN_VALUE).toBe(0);
  });

  it('should have max value', () => {
    expect(sepia.MAX_VALUE).toBe(100);
  });

  it('should have step', () => {
    expect(sepia.STEP).toBe(1);
  });

  it('should have default value', () => {
    expect(sepia.DEFAULT_VALUE).toBe(0);
  });

  describe('manipulate', () => {
    it('should append filter with sepia filter', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const value = 10;

      context.filter = 'grayscale(10%)';

      sepia.manipulate(context, value);

      expect(context.filter).toEqual(`grayscale(10%) sepia(${value}%)`);
    });
  });
});
