<template>
  <div class="row">
    <div class="card">
      <div class="card-content">
        <div class="row valign-wrapper">
          <Grid tamanho="1">
            <router-link :to="`/pagina/${usuarioid}`">
              <img :src="foto" :alt="nome" class="circle responsive-img" />
            </router-link>
          </Grid>
          <Grid tamanho="11">
            <span class="black-text">
              <strong><router-link :to="`/pagina/${usuarioid}`">{{ nome }}</router-link></strong> - <small>{{ data }}</small>
            </span>
          </Grid>
        </div>

        <slot />
      </div>

      <div class="card-action">
        <p><a style="cursor:pointer;" @click="curtida(id)">
          <i class="material-icons">{{curtiu}}</i>{{totalCurtidas}}
        </a>
        <a style="cursor:pointer;" @click="abreComentarios()">
          <i class="material-icons">insert_comment</i>{{listaComentarios.length}}
        </a>
        </p>
        <p v-if="exibirComentario" class="right-align">
          <input type="text" v-model="textoComentario" placeholder="Comentar...">
          <button v-if="textoComentario" @click="comentar(id)" class="orange btn waves-effect waves-light"><i class="material-icons">send</i></button>
        </p>
        <p v-if="exibirComentario">
          <ul class="collection">
            <li class="collection-item avatar" v-for="comentario in comentarios" :key="comentario.id">
              <img :src="comentario.user.imagem" :alt="nome" class="circle">
              <span class="title">{{comentario.user.name}} <small> - {{comentario.data}}</small></span>
              <p>
                {{comentario.texto}}
              </p>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Grid from "@/components/layout/Grid";

export default {
  name: "CardConteudo",
  components: {
    Grid,
  },
  props: ['id', "foto", "nome", "data", 'totalcurtidas', 'curtiuConteudo', 'comentarios', 'usuarioid'],
  data() {
    return {
      curtiu: this.curtiuConteudo ? 'favorite' : 'favorite_border',
      totalCurtidas: this.totalcurtidas,
      exibirComentario:false,
      textoComentario: '',
      listaComentarios: this.comentarios || []
    };
  },
  methods: {
    curtida(id){
      this.$http.put(
        `${this.$urlAPI}conteudo/curtir/${id}`, 
        {}, 
        {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}}
      )
      .then((response) => {
        if(response.data.status){
          this.totalCurtidas = response.data.curtidas;
          this.$store.commit('setConteudosLinhaDoTempo', response.data.lista.conteudos.data);
          
          if(this.curtiu == 'favorite_border'){
            this.curtiu = 'favorite';
          }else{
            this.curtiu = 'favorite_border';
          }
        }else{
          alert(response.data.erro);
        }
        
          
      })
      .catch((error) => {
        console.log(error);
        alert("Erro: tente novamente mais tarde");
      });
    },
    abreComentarios(){
      this.exibirComentario = !this.exibirComentario;
    },
    comentar(id){
      if(!this.textoComentario){
        return;
      }
      this.$http.put(
        `${this.$urlAPI}conteudo/comentar/${id}`, 
        {
          texto: this.textoComentario
        }, 
        {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}}
      )
      .then((response) => {
        if(response.data.status){
          this.textoComentario = '';
          this.$store.commit('setConteudosLinhaDoTempo', response.data.lista.conteudos.data);
          
        }else{
          alert(response.data.erro);
        }
        
          
      })
      .catch((error) => {
        console.log(error);
        alert("Erro: tente novamente mais tarde");
      });
    }

  }
};
</script>
<style scoped>
</style>