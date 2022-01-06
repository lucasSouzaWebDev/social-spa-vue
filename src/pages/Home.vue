<template>
  <Site>
    <span slot="menu-lateral">
      <div class="row valign-wrapper">
        <Grid tamanho="4">
          <router-link :to="`/pagina/${usuario.id}/${$slug(usuario.name, {lower: true})}`">
            <img
              :src="usuario.imagem"
              :alt="'perfil ' + usuario.name"
              class="circle responsive-img"
            />
          </router-link>
        </Grid>
        <Grid tamanho="8">
          <span class="black-text">
            <router-link :to="`/pagina/${usuario.id}`">
              <h5>{{usuario.name}}</h5>
            </router-link>
            Add the "circle" class to it to make it appear circular.
          </span>
        </Grid>
      </div>
    </span>
    <span slot="menu-lateral-amigos">
      <h3>Seguindo</h3>
      <router-link v-for="amigo in amigos" :key="amigo.id" :to="`/pagina/${amigo.id}/${$slug(amigo.name, {lower: true})}`">
        <li>{{amigo.name}}</li>
      </router-link>
      <li v-if="!amigos.length">Nenhum</li>
    </span>
    <span slot="principal">
      <PublicarConteudo />
      <CardConteudo v-for="conteudo in listaConteudos" :key="conteudo.id"
        :id="conteudo.id"
        :totalcurtidas="conteudo.total_curtidas"
        :comentarios="conteudo.comentarios"
        :curtiuConteudo="conteudo.curtiu_conteudo"
        :usuarioid="conteudo.user.id"
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
      <div v-scroll="handleScroll">

      </div>
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
      usuario: {imagem: '', name: ''},
      urlProximaPagina: null,
      pararScroll: false,
      amigos: []
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
            this.urlProximaPagina = response.data.conteudos.next_page_url;

            this.$http
            .get(`${this.$urlAPI}usuario/listaamigos`, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
            .then((response) => {
              console.log(response);
              if(response.data.status){
                this.amigos = response.data.amigos;
              }else{
                alert(response.data.erro);
              }
              
            })
            .catch((error) => {
              console.log(error);
              alert("Erro: tente novamente mais tarde");
            });
          }
          
        })
        .catch((error) => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
        });
    }
  },
  methods: {
    carregaPaginacao(){
      if(!this.urlProximaPagina){
        return;
      }
      this.$http
        .get(this.urlProximaPagina, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
        .then((response) => {
          console.log(response);
          if(response.data.status && this.$route.name == 'Home'){
            this.$store.commit('setPaginacaoConteudosLinhaDoTempo', response.data.conteudos.data);
            this.urlProximaPagina = response.data.conteudos.next_page_url;
            this.pararScroll = false;
          }
          
        })
        .catch((error) => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
        });
    },
    handleScroll() {

      if(this.pararScroll){

        return;
      }
      if(window.scrollY >= document.body.clientHeight - 1034){
        this.pararScroll = true;
        this.carregaPaginacao();
      }
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