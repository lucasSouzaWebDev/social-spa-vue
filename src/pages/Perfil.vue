<template>
  <Site>
    <span slot="menu-lateral">
      <img
        src="https://etus.com.br/blog/wp-content/uploads/2021/04/etus-evolucao-redes-sociais-scaled.jpg"
        class="responsive-img"
      />
    </span>
    <span slot="principal">
      <span>
        <h2>Peril</h2>

        <input type="text" placeholder="Nome" v-model="name" />
        <input type="text" placeholder="E-mail" v-model="email" />
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <input type="password" placeholder="Senha" v-model="password" />
        <input type="password" placeholder="Confirme sua Senha" v-model="password_confirmation"/>
        <button class="blue btn waves-effect waves-light" @click="perfil()">
          Atualizar
        </button>
      </span>
    </span>
  </Site>
</template>
<script>
import Site from "@/templates/Site";
import axios from "axios";

export default {
  name: "Perfil",
  components: {
    Site,
  },
  data() {
    return {
      usuario: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  created(){
    let usuario = sessionStorage.getItem("usuario");
    if(usuario){
      this.usuario = JSON.parse(usuario);
      this.name = this.usuario.name;
      this.email = this.usuario.email;
    }else{
      this.$router.push('/login');
    }
  },
  methods: {
    perfil() {
      axios
        .put(`http://127.0.0.1:8000/api/perfil`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }, {"headers": {"authorization": `Bearer ${this.usuario.token}`}})
        .then((response) => {
          if(response.data.token){
            console.log(response.data);
            sessionStorage.setItem('usuario', JSON.stringify(response.data));
            alert('Perfil atualizado.');
          }else{
            console.log('erros de validação');
            let erros = '';
            for(let erro of Object.values(response.data)){
              erros += erro + "";
            }
            alert(erros);
          }
          
        })
        .catch((error) => {
          console.log(error);
          alert("Erro: tente novamente mais tarde");
        });
    },
  },
};
</script>
<style scoped>
</style>