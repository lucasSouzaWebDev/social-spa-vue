<template>
  <Site>
    <span slot="menu-lateral">
      <div class="row valign-wrapper">
        <Grid tamanho="4">
          <img
            src="https://materializecss.com/images/yuna.jpg"
            alt=""
            class="circle responsive-img"
          />
          <!-- notice the "circle" class -->
        </Grid>
        <Grid tamanho="8">
          <span class="black-text">
            <h5>Erika</h5>
            Add the "circle" class to it to make it appear circular.
          </span>
        </Grid>
      </div>
    </span>
    <span slot="principal">
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
  </Site>
</template>
<script>
import Site from "@/templates/Site";
import CardConteudo from "@/components/social/CardConteudo";
import CardDetalhe from "@/components/social/CardDetalhe";
import PublicarConteudo from "@/components/social/PublicarConteudo";

export default {
  name: "Home",
  components: {
    Site,
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