<template>
  <div class="toolbar">
    <div class="property">
      <h3>Sepia</h3>
      <input class="sepia-range" type="range" min="0" max="100" step="1" v-model="sepia" v-on:mouseup="storePreview" />
    </div>
    <div class="property">
      <h3>Grayscale</h3>
      <input class="grayscale-range" type="range" min="0" max="100" step="1" v-model="grayscale" v-on:mouseup="storePreview" />
    </div>
    <div class="property">
      <h3>Time travel</h3>
      <button class="undo" v-on:click="undo()" v-bind:disabled="!hasHistory">Undo</button>
      <button class="redo" v-on:click="redo()" v-bind:disabled="!hasUndoneFilter">Redo</button>
      <button class="reset" v-on:click="reset()" v-bind:disabled="!hasHistory">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'toolbar',
  computed: {
    ...mapGetters(['hasHistory', 'hasUndoneFilter']),
    sepia: {
      get() {
        return this.$store.getters.sepia;
      },
      set(value) {
        this.$store.dispatch('preview', { property: 'sepia', value });
      },
    },
    grayscale: {
      get() {
        return this.$store.getters.grayscale;
      },
      set(value) {
        this.$store.dispatch('preview', { property: 'grayscale', value });
      },
    },
  },
  methods: mapActions(['undo', 'redo', 'reset', 'storePreview']),
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
