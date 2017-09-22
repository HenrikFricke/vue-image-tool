<template>
  <div class="toolbar">
    <div class="property image-tool" v-for="imageTool in imageTools" v-bind:key="imageTool.ID">
      <h3>{{imageTool.LABEL}}</h3>
      <input v-bind:value="imageTool.value" v-on:input="handleInput" v-bind:data-tool="imageTool.ID" type="range" v-bind:min="imageTool.MIN_VALUE" v-bind:max="imageTool.MAX_VALUE" v-bind:step="imageTool.STEP" v-on:change="storePreview" />
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
    ...mapGetters(['hasHistory', 'hasUndoneFilter', 'imageTools']),
  },
  methods: {
    ...mapActions(['undo', 'redo', 'reset', 'storePreview']),
    handleInput(e) {
      this.$store.dispatch('preview', {
        id: e.target.dataset.tool,
        value: e.target.value,
      });
    },
  },
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
