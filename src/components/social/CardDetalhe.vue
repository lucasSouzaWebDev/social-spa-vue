<template>
  <span>
    <div v-if="imagem && imagem != '#'" class="card-image">
      <a v-if="link && link != '#'" :href="link">
        <img :src="imagem" />
        <span class="card-title">{{ titulo || "" }}</span>
      </a>
      <span v-if="!link || link == '#'">
        <img :src="imagem" />
        <span class="card-title">{{ titulo || "" }}</span>
      </span>
    </div>
    <div  class="card-content">
      <span v-if="!imagem || imagem == '#'">
        <span class="card-title">{{ titulo || "" }}</span>
      </span>
      <p>{{ txt }}</p>
      <p v-if="link && link != '#'">
        <a :href="link">Link de conteudo</a>
      </p>
    </div>
  </span>
</template>
<script>
export default {
  name: "CardDetalhe",
  components: {},
  props: ["imagem", "titulo", "txt", "link"],
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>