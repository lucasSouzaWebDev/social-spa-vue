<template>
  <div :class="'col s' + tamanho">
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Grid",
  props: ['tamanho', 'logo', 'descricao', 'ano'],
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>