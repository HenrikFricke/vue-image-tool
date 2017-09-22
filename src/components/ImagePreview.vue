<template>
  <div>
    <img v-bind:src="imageSource" v-on:load="drawCanvas" />
    <canvas />
    <a id="save" v-on:click="saveImage" download="image.jpg">Save</a>
    <input type="file" accept=".png, .jpg, .jpeg" v-on:change="handleInputChange" />
    <div class="droparea" v-on:drop="dropImage" v-on:dragover="dragover" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'image-preview',
  computed: {
    ...mapGetters(['imageSource', 'imageTools']),
  },
  methods: {
    drawCanvas() {
      const image = this.$el.querySelector('img');
      const canvas = this.$el.querySelector('canvas');
      const ctx = canvas.getContext('2d');

      ctx.canvas.width = image.width;
      ctx.canvas.height = image.height;

      this.imageTools.forEach((imageTool) => {
        imageTool.manipulate(ctx, imageTool.value);
      });

      ctx.drawImage(image, 0, 0);
    },
    saveImage() {
      const canvas = this.$el.querySelector('canvas');
      const link = this.$el.querySelector('a');

      link.href = canvas.toDataURL('image/jpeg');
    },
    handleInputChange(event) {
      this.uploadImage(event.target.files[0]);
    },
    uploadImage(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return;
      }

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.$store.dispatch('updateImageSource', {
          imageSource: fileReader.result,
        });
      });

      fileReader.readAsDataURL(file);
    },
    dropImage(event) {
      this.uploadImage(event.dataTransfer.files[0]);
      event.preventDefault();
    },
    dragover(event) {
      event.preventDefault();
    },
  },
  watch: {
    imageTools() {
      this.drawCanvas();
    },
  },
};
</script>

<style scoped>
img {
  display: none;
}

canvas {
  max-width: 600px;
}

.droparea {
  width: 400px;
  height: 400px;
  border: 2px solid gray;
}
</style>
