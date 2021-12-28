<template>
  <div class="row">
    <div class="card">
      <div class="card-content">
        <div class="row valign-wrapper">
          <Grid tamanho="1">
            <img :src="foto" :alt="nome" class="circle responsive-img" />
            <!-- notice the "circle" class -->
          </Grid>
          <Grid tamanho="11">
            <span class="black-text">
              <strong>{{ nome }}</strong> - <small>{{ data }}</small>
            </span>
          </Grid>
        </div>

        <slot />
      </div>

      <div class="card-action">
        <p><a style="cursor:pointer;" @click="curtida(id)">
          <i class="material-icons">{{curtiu}}</i>{{totalCurtidas}}
        </a>
          <i class="material-icons">insert_comment</i>
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
  props: ['id', "foto", "nome", "data"],
  data() {
    return {
      curtiu:'favorite_border',
      totalCurtidas: 0
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
    }
  }
};
</script>
<style scoped>
</style>