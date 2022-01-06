<template>
  <Site>
    <span slot="menu-lateral">
      <div class="row valign-wrapper">
        <Grid tamanho="4">
          <router-link :to="`/pagina/${donoPagina.id}/${$slug(donoPagina.name, {lower: true})}`">
            <img
              :src="donoPagina.imagem"
              :alt="'perfil ' + donoPagina.name"
              class="circle responsive-img"
            />
          </router-link>
        </Grid>
        <Grid tamanho="8">
          <span class="black-text">
          <router-link :to="`/pagina/${donoPagina.id}/${$slug(donoPagina.name, {lower: true})}`">
              <h5>{{donoPagina.name}}</h5>
            </router-link>
            <button v-if="exibeBtnSeguir" @click="amigo(donoPagina.id)" class="btn">{{textoBtn}}</button>
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
      <div v-scroll="handleScroll"></div>
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
  name: "Pagina",
  components: {
    Site,
    CardConteudo,
    CardDetalhe,
    PublicarConteudo,
    Grid
  },
  data() {
    return {
      usuario: false,
      urlProximaPagina: null,
      pararScroll: false,
      donoPagina: {imagem: '', name: ''},
      exibeBtnSeguir: false,
      amigos: [],
      amigosLogado: [],
      textoBtn: 'Seguir'
    };
  },
  created(){
    this.atualizarPagina();
  },
  watch:{
    '$route': 'atualizarPagina'
  },
  methods: {
    atualizarPagina(){
      let usuario = this.$store.getters.getUsuario;
      if(usuario){
        this.usuario = this.$store.getters.getUsuario;
        this.$http
          .get(`${this.$urlAPI}conteudo/pagina/lista/${this.$route.params.id}`, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
          .then((response) => {
            console.log(response);
            if(response.data.status){
              this.$store.commit('setConteudosLinhaDoTempo', response.data.conteudos.data);
              this.urlProximaPagina = response.data.conteudos.next_page_url;
              this.donoPagina = response.data.dono;
              if(this.donoPagina.id != this.usuario.id){
                this.exibeBtnSeguir = true;
              }else{
                this.exibeBtnSeguir = false;
              }

              this.$http
              .get(`${this.$urlAPI}usuario/listaamigospagina/${this.donoPagina.id}`, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
              .then((response) => {
                console.log(response);
                if(response.data.status){
                  this.amigos = response.data.amigos;
                  this.amigosLogado = response.data.amigoslogado;
                  this.eAmigo();
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
    eAmigo(){
      for(let amigo of this.amigosLogado){
        if(amigo.id == this.donoPagina.id){
          this.textoBtn = 'Deixar de Seguir';
          return;
        }
      }
      this.textoBtn = 'Seguir';
    },
    carregaPaginacao(){
      if(!this.urlProximaPagina){
        return;
      }
      this.$http
        .get(this.urlProximaPagina, {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}})
        .then((response) => {
          console.log(response);
          if(response.data.status){
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
    },
    amigo(id){
      console.log(id);

      this.$http.post(
        `${this.$urlAPI}usuario/amigo`, 
        {id: id}, 
        {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}}
      )
      .then((response) => {
        if(response.data.status){
          console.log(response);
          this.amigosLogado = response.data.amigos;
          this.eAmigo();
        }else{
          alert(response.data.erro);
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