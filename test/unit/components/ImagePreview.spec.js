import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import ImagePreview from '../../../src/components/ImagePreview';

Vue.use(Vuex);

describe('ImagePreview', () => {
  let component;
  let grayscale;
  let sepia;
  let imageSource;
  let image;

  beforeEach(() => {
    grayscale = 10;
    sepia = 20;
    imageSource = 'static/image.jpg';

    const store = new Vuex.Store({
      getters: {
        sepia: () => sepia,
        grayscale: () => grayscale,
        imageSource: () => imageSource,
      },
    });
    component = mount(ImagePreview, { globals: { $store: store } });
    image = component.find('img')[0];
  });

  describe('image', () => {
    it('should have an `src` attribute', () => {
      expect(image.getAttribute('src')).toEqual(imageSource);
    });
  });
});
