<template>
  <Site>
    <span slot="menu-lateral">
      <img
        :src="usuario.imagem"
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
            <input type="file" @change="uploadImagem" />
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
      imagem: "",
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
    uploadImagem(e) {
      let file = e.target.files || e.dataTransfer.files;
      if(!file.length){
        return;
      }

      let reader = new FileReader();
      reader.onload = (e) => {
        this.imagem = e.target.result;
      };

      reader.readAsDataURL(file[0]);
      console.log(this.imagem);
    },
    perfil() {
      this.$http
        .put(`${this.$urlAPI}perfil`, {
          name: this.name,
          email: this.email,
          imagem: this.imagem,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }, {"headers": {"authorization": `Bearer ${this.usuario.token}`}})
        .then((response) => {
          if(response.data.status){
            this.usuario = response.data.usuario;
            sessionStorage.setItem('usuario', JSON.stringify(response.data));
            alert('Perfil atualizado.');
          }else if(response.data.status == false && response.data.validacao){
            //console.log('erros de validação');
            let erros = '';
            for(let erro of Object.values(response.data.erros)){
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