<template>
  <div class="row">
    <Grid class="input-field" tamanho="12">
      <textarea id="conteudo" v-model="conteudo" class="materialize-textarea"></textarea>
      <label for="conteudo">O que está acontecendo?</label>
    </Grid>
    <p>
      <Grid v-if="conteudo"
        class="blue btn waves-effect waves-light col s"
        tamanho="2 offset-s10"
        >Publicar</Grid
      >
    </p>
  </div>
</template>
<script>
import Grid from "@/components/layout/Grid";

export default {
  name: "PublicarConteudo",
  components: {
    Grid,
  },
  props: [],
  data() {
    return {
      conteudo: ''
    };
  },
};
</script>
<style scoped>
</style>