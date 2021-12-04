<template>
  <span>
    <div v-if="imagem" class="card-image">
      <img :src="imagem" />
      <span class="card-title">{{ titulo || "" }}</span>
    </div>
    <div v-if="txt" class="card-content">
      <p>{{ txt }}</p>
    </div>
  </span>
</template>
<script>
export default {
  name: "CardDetalhe",
  components: {},
  props: ["imagem", "titulo", "txt"],
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>