import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import ImagePreview from '../../../src/components/ImagePreview';

Vue.use(Vuex);

describe('ImagePreview', () => {
  let canvas;
  let component;
  let grayscale;
  let sepia;
  let image;
  let saveButton;

  beforeEach(() => {
    grayscale = 10;
    sepia = 20;

    const store = new Vuex.Store({
      getters: {
        sepia: () => sepia,
        grayscale: () => grayscale,
        imageSource: () => 'image/source.png',
      },
    });
    component = mount(ImagePreview, { globals: { $store: store } });
    image = component.find('img')[0];
    canvas = component.find('canvas')[0];
    saveButton = component.find('a#save')[0];
  });

  describe('template', () => {
    describe('image', () => {
      it('should have an `src` attribute', () => {
        expect(image.getAttribute('src')).toEqual('image/source.png');
      });

      it('should have event listener for onload', () => {
        const drawCanvasMock = jasmine.createSpy('drawCanvas');
        component.setMethods({ drawCanvas: drawCanvasMock });
        image.trigger('load');

        expect(drawCanvasMock).toHaveBeenCalled();
      });
    });

    describe('canvas', () => {
      it('should be present', () => {
        expect(canvas).not.toBeUndefined();
      });
    });

    describe('save button', () => {
      it('should call saveImage', () => {
        const saveImageMock = jasmine.createSpy('saveImage');
        component.setMethods({ saveImage: saveImageMock });
        saveButton.trigger('click');

        expect(saveImageMock).toHaveBeenCalled();
      });

      it('should have `download` attribute', () => {
        expect(saveButton.getAttribute('download')).toEqual('image.jpg');
      });
    });
  });

  describe('methods', () => {
    describe('saveImage', () => {
      it('should pass base 64 encoded image to save button', () => {
        const ctx = canvas.element.getContext('2d');

        ctx.beginPath();
        ctx.rect(20, 20, 150, 100);
        ctx.fillStyle = 'red';
        ctx.fill();
        const dataURL = canvas.element.toDataURL('image/jpeg');

        component.vm.saveImage();

        expect(saveButton.getAttribute('href')).toEqual(dataURL);
      });
    });
  });
});
