import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Cadastro from '@/pages/Cadastro'
import Perfil from '@/pages/Perfil'
import Pagina from '@/pages/Pagina'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/pagina/:id/:nome?',
      name: 'Pagina',
      component: Pagina
    },
    
  ]
})
