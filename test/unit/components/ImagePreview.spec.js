import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';

import ImagePreview from '../../../src/components/ImagePreview';

Vue.use(Vuex);

describe('ImagePreview', () => {
  let canvas;
  let dispatch;
  let component;
  let image;
  let store;
  let saveButton;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        imageTools: () => [],
        imageSource: () => 'image/source.png',
      },
    });

    dispatch = jasmine.createSpy('dispatch');
    store.dispatch = dispatch;

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

    describe('upload input', () => {
      let input;

      beforeEach(() => {
        input = component.find('input')[0];
      });

      it('should be present', () => {
        expect(input).not.toBeUndefined();
      });

      it('should have `accept` attribute', () => {
        expect(input.element.getAttribute('accept')).toEqual('.png, .jpg, .jpeg');
      });

      it('should handle onChange event', () => {
        const uploadImage = jasmine.createSpy('uploadImage');
        component.setMethods({ uploadImage });
        input.trigger('change');

        expect(uploadImage).toHaveBeenCalled();
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

    describe('uploadImage', () => {
      it('should decline invalid files', () => {
        const event = {
          target: {
            files: [
              {
                type: 'image/gif',
              },
            ],
          },
        };

        component.vm.uploadImage(event);

        expect(dispatch).not.toHaveBeenCalled();
      });

      it('should dispatch base 64 encoded image', () => {
        const event = {
          target: {
            files: [
              {
                type: 'image/jpeg',
              },
            ],
          },
        };

        const fileReaderMock = {
          readAsDataURL: jasmine.createSpy('readAsDataURL'),
          addEventListener: jasmine.createSpy('addEventListener'),
          result: '<-- a base 64 encoded image -->',
        };

        spyOn(window, 'FileReader').and.returnValue(fileReaderMock);

        component.vm.uploadImage(event);
        expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(event.target.files[0]);
        expect(fileReaderMock.addEventListener).toHaveBeenCalledWith('load', jasmine.any(Function));

        const listener = fileReaderMock.addEventListener.calls.mostRecent().args[1];
        listener();

        expect(store.dispatch).toHaveBeenCalledWith('updateImageSource', {
          imageSource: fileReaderMock.result,
        });
      });
    });
  });
});
