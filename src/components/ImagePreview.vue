<template>
  <img src="../assets/image.jpg" v-bind:style="{ filter: `sepia(${sepia}%) grayscale(${grayscale}%)` }" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'image-preview',
  computed: {
    ...mapGetters(['sepia', 'grayscale']),
  },
};
</script>

<style scoped>
img {
  width: 600px;
}
</style>
