<template>
  <span id="app">
    <header>
      <NavBar cor="blue" logo="Social" url="#" />
    </header>
    <main>
      <div class="container">
        <div class="row">
          <Grid tamanho="4">
            <CardMenu>
              <div class="row valign-wrapper">
                <Grid tamanho="4">
                  <img
                    src="https://materializecss.com/images/yuna.jpg"
                    alt=""
                    class="circle responsive-img"
                  />
                  <!-- notice the "circle" class -->
                </Grid>
                <Grid tamanho="8">
                  <span class="black-text">
                    <h5>Erika</h5>
                    Add the "circle" class to it to make it appear circular.
                  </span>
                </Grid>
              </div>
            </CardMenu>
            <CardMenu>
              <div class="row valign-wrapper">
                <Grid tamanho="4">
                  <img
                    src="https://materializecss.com/images/yuna.jpg"
                    alt=""
                    class="circle responsive-img"
                  />
                  <!-- notice the "circle" class -->
                </Grid>
                <Grid tamanho="8">
                  <span class="black-text">
                    <h5>Erika</h5>
                    Add the "circle" class to it to make it appear circular.
                  </span>
                </Grid>
              </div>
            </CardMenu>
          </Grid>
          <Grid tamanho="8">
            <router-view />
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
  name: "App",
  components: {
    NavBar,
    Footer,
    Grid,
    CardMenu,
  },
};
</script>

<style>
</style>
