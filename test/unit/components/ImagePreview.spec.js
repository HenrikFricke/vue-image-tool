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
  });

  describe('computed', () => {
    it('should have sepia value', () => {
      expect(component.vm.sepia).toEqual(sepia);
    });

    it('should have grayscale value', () => {
      expect(component.vm.grayscale).toEqual(grayscale);
    });
  });

  describe('image', () => {
    it('should return an image element', () => {
      expect(component.is('img')).toBeTruthy();
    });

    it('should have an `src` attribute', () => {
      expect(component.getAttribute('src')).toEqual(imageSource);
    });
  });
});
