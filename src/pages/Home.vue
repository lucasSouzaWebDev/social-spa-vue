<template>
  <Site>
    <span slot="menu-lateral">
      <div class="row valign-wrapper">
        <Grid tamanho="4">
          <img
            :src="usuario.imagem"
            :alt="'perfil ' + usuario.name"
            class="circle responsive-img"
          />
          <!-- notice the "circle" class -->
        </Grid>
        <Grid tamanho="8">
          <span class="black-text">
            <h5>{{usuario.name}}</h5>
            Add the "circle" class to it to make it appear circular.
          </span>
        </Grid>
      </div>
    </span>
    <span slot="principal">
      <PublicarConteudo />
      <CardConteudo v-for="conteudo in listaConteudos" :key="conteudo.id"
        :foto="conteudo.user.imagem"
        :nome="conteudo.user.name"
        :data="conteudo.data"
      >
        <CardDetalhe
          :imagem="conteudo.imagem"
          :titulo="conteudo.titulo"
          :txt="conteudo.texto"
          :link="conteudo.link"
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
import Grid from "@/components/layout/Grid";

export default {
  name: "Home",
  components: {
    Site,
    CardConteudo,
    CardDetalhe,
    PublicarConteudo,
    Grid
  },
  data() {
    return {
      usuario: false
    };
  },
  created(){
    let usuario = this.$store.getters.getUsuario;
    if(usuario){
      this.usuario = this.$store.getters.getUsuario;
      this.$http
        .get(`${this.$urlAPI}conteudo/lista`, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
        .then((response) => {
          console.log(response);
          if(response.data.status){
            this.$store.commit('setConteudosLinhaDoTempo', response.data.conteudos.data);
          }
          
        })
        .catch((error) => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
        });
    }
  },
  computed: {
    listaConteudos(){
      return this.$store.getters.getConteudosLinhaDoTempo;
    }
  }
};
</script>
<style scoped>
</style>