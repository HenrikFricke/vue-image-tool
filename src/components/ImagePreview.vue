<template>
  <div>
    <img v-bind:src="imageSource" v-on:load="drawCanvas" />
    <canvas />
    <a id="save" v-on:click="saveImage" download="image.jpg">Save</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'image-preview',
  computed: {
    ...mapGetters(['sepia', 'grayscale', 'imageSource']),
  },
  methods: {
    drawCanvas() {
      const image = this.$el.querySelector('img');
      const canvas = this.$el.querySelector('canvas');
      const ctx = canvas.getContext('2d');

      ctx.canvas.width = image.width;
      ctx.canvas.height = image.height;
      ctx.filter = `sepia(${this.sepia}%) grayscale(${this.grayscale}%)`;
      ctx.drawImage(image, 0, 0);
    },
    saveImage() {
      const canvas = this.$el.querySelector('canvas');
      const link = this.$el.querySelector('a');

      link.href = canvas.toDataURL('image/jpeg');
    },
  },
  watch: {
    sepia() {
      this.drawCanvas();
    },
    grayscale() {
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
</style>
