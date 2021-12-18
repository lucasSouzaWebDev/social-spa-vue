<template>
  <LoginTemplate>
    <span slot="menu-lateral">
      <img
        src="https://etus.com.br/blog/wp-content/uploads/2021/04/etus-evolucao-redes-sociais-scaled.jpg"
        class="responsive-img"
      />
    </span>
    <span slot="principal">
      <span>
        <h2>Login</h2>

        <input type="text" placeholder="E-mail" v-model="usuario.email" />
        <input type="password" placeholder="Senha" v-model="usuario.password" />
        <button class="blue btn waves-effect waves-light" @click="login()">
          Entrar
        </button>
      </span>
    </span>
  </LoginTemplate>
</template>
<script>
import LoginTemplate from "@/templates/LoginTemplate";

export default {
  name: "Login",
  components: {
    LoginTemplate,
  },
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${this.$urlAPI}login`, {
          email: this.usuario.email,
          password: this.usuario.password
        })
        .then(response => {
          //console.log(response);
          if(response.data.status){
            sessionStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            this.$router.push('/');
          }else if(response.data.status == false && response.data.validacao){
            // erros de validação
            let erros = '';
            for(let erro of Object.values(response.data.erros)){
              erros += erro + " ";
            }
            alert(erros);
            
          }else{
            // login não existe
            alert('Login inválido!');
          }
        })
        .catch(error => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
        });
    },
  },
};
</script>
<style scoped>
</style>