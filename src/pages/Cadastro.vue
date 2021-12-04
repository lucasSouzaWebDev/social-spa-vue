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
        <h2>Cadastro</h2>

        <input type="text" placeholder="Nome" value="" />
        <input type="text" placeholder="E-mail" value="" />
        <input type="password" placeholder="Senha" value="" />
        <input type="password" placeholder="Confirme sua Senha" value="" />
        <button class="blue btn waves-effect waves-light">
          Cadastrar
        </button>
      </span>
    </span>
  </LoginTemplate>
</template>
<script>
import LoginTemplate from "@/templates/LoginTemplate";

export default {
  name: "Cadastro",
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