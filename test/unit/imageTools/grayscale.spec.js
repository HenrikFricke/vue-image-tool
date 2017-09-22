import * as grayscale from '../../../src/imageTools/grayscale';

describe('ImageTool: Grayscale', () => {
  it('should have an ID', () => {
    expect(grayscale.ID).toBe('grayscale');
  });

  it('should have a label', () => {
    expect(grayscale.LABEL).toBe('Grayscale');
  });

  it('should have min value', () => {
    expect(grayscale.MIN_VALUE).toBe(0);
  });

  it('should have max value', () => {
    expect(grayscale.MAX_VALUE).toBe(100);
  });

  it('should have step', () => {
    expect(grayscale.STEP).toBe(1);
  });

  it('should have default value', () => {
    expect(grayscale.DEFAULT_VALUE).toBe(0);
  });

  describe('manipulate', () => {
    it('should append filter with grayscale filter', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const value = 10;

      context.filter = 'sepia(20%)';

      grayscale.manipulate(context, value);

      expect(context.filter).toEqual(`sepia(20%) grayscale(${value}%)`);
    });
  });
});
