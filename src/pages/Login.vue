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
import axios from "axios";

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
      axios
        .post(`http://127.0.0.1:8000/api/login`, {
          email: this.usuario.email,
          password: this.usuario.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>