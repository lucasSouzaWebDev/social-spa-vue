<template>
  <div class="row">
    <Grid class="input-field" tamanho="12">
      <label for="conteudo">O que está acontecendo?</label>
      <input type="text" v-model="conteudo.titulo">
      <textarea v-if="conteudo.titulo" placeholder="Conteúdo" id="conteudo" v-model="conteudo.texto" class="materialize-textarea"></textarea>
      <input v-if="conteudo.titulo && conteudo.texto" placeholder="Link" type="text" v-model="conteudo.link">
      <input v-if="conteudo.titulo && conteudo.texto" placeholder="Link da Imagem" type="text" v-model="conteudo.imagem">
    </Grid>
    <p class="right">
      <button @click="addConteudo()" v-if="conteudo.titulo && conteudo.texto"
        class="blue btn waves-effect waves-light col s"
        >Publicar</button
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
      conteudo: {titulo: '', texto: '', link: '', imagem: ''}
    };
  },
  methods: {
    addConteudo(){
      console.log(this.conteudo);
      this.$http.post(`${this.$urlAPI}conteudo/adicionar`, {
        titulo : this.conteudo.titulo,
        texto : this.conteudo.texto,
        link : this.conteudo.link,
        imagem : this.conteudo.imagem
      }, 
      {"headers": {"authorization": `Bearer ${this.$store.getters.getToken}`}}).then(response => {
        if(response.data.status){
          console.log(response.data.conteudos);
          this.conteudo = {titulo: '', texto: '', link: '', imagem: ''};
          this.$store.commit('setConteudosLinhaDoTempo', response.data.conteudos.data);
        }else if(response.data.status == false && response.data.validacao){
            //console.log('erros de validação');
            let erros = '';
            for(let erro of Object.values(response.data.erros)){
              erros += erro + "";
            }
            alert(erros);
          }

      }).catch(error => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
      });
    }
  }
};
</script>
<style scoped>
</style>