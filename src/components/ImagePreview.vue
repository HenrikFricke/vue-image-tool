<template>
  <img v-bind:src="imageSource" v-bind:style="{ filter: `sepia(${sepia}%) grayscale(${grayscale}%)` }" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'image-preview',
  computed: {
    ...mapGetters(['sepia', 'grayscale', 'imageSource']),
  },
};
</script>

<style scoped>
img {
  width: 600px;
}
</style>
