<template>
  <div id="app">
    <toolbar></toolbar>
    <image-preview></image-preview>
  </div>
</template>

<script>
import ImagePreview from './components/ImagePreview';
import Toolbar from './components/Toolbar';

export default {
  name: 'app',
  components: {
    ImagePreview,
    Toolbar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
