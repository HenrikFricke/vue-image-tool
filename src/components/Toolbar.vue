<template>
  <div class="toolbar">
    <div class="property">
      <h3>Sepia</h3>
      <button v-on:click="update({ property: 'sepia', value: 0})">0%</button>
      <button v-on:click="update({ property: 'sepia', value: 50})">50%</button>
      <button v-on:click="update({ property: 'sepia', value: 100})">100%</button>
    </div>
    <div class="property">
      <h3>Grayscale</h3>
      <button v-on:click="update({ property: 'grayscale', value: 0})">0%</button>
      <button v-on:click="update({ property: 'grayscale', value: 50})">50%</button>
      <button v-on:click="update({ property: 'grayscale', value: 100})">100%</button>
    </div>
    <div class="property">
      <h3>Time travel</h3>
      <button class="undo" v-on:click="undo()" v-bind:disabled="!hasHistory">Undo</button>
      <button class="redo" v-on:click="redo()">Redo</button>
      <button class="reset" v-on:click="reset()">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'toolbar',
  computed: mapGetters(['hasHistory']),
  methods: mapActions(['update', 'undo', 'redo', 'reset']),
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-around;
  width: 600px;
  margin: 0 auto 25px auto;
}
</style>
