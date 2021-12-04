<template>
  <span>
    <PublicarConteudo />
    <CardConteudo
      foto="https://materializecss.com/images/yuna.jpg"
      nome="Erika Denck"
      data="13/05/2021 12:25"
    >
      <CardDetalhe
        imagem="https://materializecss.com/images/sample-1.jpg"
        titulo="teste"
        txt="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
      />
    </CardConteudo>
  </span>
</template>
<script>
import CardConteudo from "@/components/social/CardConteudo";
import CardDetalhe from "@/components/social/CardDetalhe";
import PublicarConteudo from "@/components/social/PublicarConteudo";

export default {
  name: "Home",
  components: {
    CardConteudo,
    CardDetalhe,
    PublicarConteudo,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>