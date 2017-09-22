import imageTools from '../../../src/imageTools';

import * as sepia from '../../../src/imageTools/sepia';
import * as grayscale from '../../../src/imageTools/grayscale';

describe('ImageTools', () => {
  it('should have sepia tool', () => {
    expect(imageTools).toContain(sepia);
  });

  it('should have grayscale tool', () => {
    expect(imageTools).toContain(grayscale);
  });
});
