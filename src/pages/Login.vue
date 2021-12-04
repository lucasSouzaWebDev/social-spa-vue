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

        <input type="text" placeholder="E-mail" value="" />
        <input type="text" placeholder="Senha" value="" />
        <button class="blue btn waves-effect waves-light">
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
      
    };
  },
};
</script>
<style scoped>
</style>