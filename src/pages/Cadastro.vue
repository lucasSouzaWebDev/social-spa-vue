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

        <input type="text" placeholder="Nome" v-model="name" />
        <input type="text" placeholder="E-mail" v-model="email" />
        <input type="password" placeholder="Senha" v-model="password" />
        <input type="password" placeholder="Confirme sua Senha" v-model="password_confirmation" />
        <button class="blue btn waves-effect waves-light" @click="cadastro()">
          Cadastrar
        </button>
      </span>
    </span>
  </LoginTemplate>
</template>
<script>
import LoginTemplate from "@/templates/LoginTemplate";
import axios from "axios";

export default {
  name: "Cadastro",
  components: {
    LoginTemplate,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    cadastro() {
      axios
        .post(`http://127.0.0.1:8000/api/cadastro`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          console.log(response);
          if(response.data.token){
            sessionStorage.setItem('usuario', JSON.stringify(response.data));
            this.$router.push('/');
          }else if(response.data.status == false){
            alert('Erro no cadastro!');
          }else{
            // erros de validação
            let erros = '';
            for(let erro of Object.values(response.data)){
              erros += erro + " ";
            }
            alert(erros);
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