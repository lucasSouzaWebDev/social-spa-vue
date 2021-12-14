<template>
  <span id="app">
    <header>
      <NavBar cor="blue" logo="Social" url="/">
        <li><router-link to="/">Home</router-link></li>
        <li v-if="!usuario"><router-link to="/login">Entrar</router-link></li>
        <li v-if="!usuario"><router-link to="/cadastro">Cadastre-se</router-link></li>
        <li v-if="usuario"><router-link to="/perfil">{{usuario.name}}</router-link></li>
        <li v-if="usuario"><a @click="sair()">Sair</a></li>
      </Navbar>
    </header>
    <main>
      <div class="container">
        <div class="row">
          <Grid tamanho="4">
            <CardMenu>
              <slot name="menu-lateral" />
            </CardMenu>
            <CardMenu>
              <h3>Amigos</h3>
              <li>Lucas</li>
              <li>Erika</li>
              <li>Teste</li>
            </CardMenu>
          </Grid>
          <Grid tamanho="8">
            <slot name="principal" />
          </Grid>
        </div>
      </div>
    </main>
    <Footer cor="blue" logo="Social" descricao="Teste de descrição" ano="2021">
      <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
    </Footer>
  </span>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Grid from "@/components/layout/Grid";
import CardMenu from "@/components/layout/CardMenu";

export default {
  name: "Site",
  data(){
    return {
      usuario: false
    }
  },
  components: {
    NavBar,
    Footer,
    Grid,
    CardMenu,
  },
  created(){
    let usuario = sessionStorage.getItem("usuario");
    if(usuario){
      this.usuario = JSON.parse(usuario);
    }else{
      this.$router.push('/login');
    }
  },
  methods: {
    sair() {
      sessionStorage.clear();
      this.usuario = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>
