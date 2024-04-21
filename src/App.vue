<template>
  <div>
    <router-view></router-view>
    <ToastContainer />
  </div>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';
import Index from './pages/Index.vue';
import Acceuil from './pages/Acceuil.vue';
import Connexion from './pages/Connexion.vue';
import Inscription from './pages/Inscription.vue';
import Acceuiladmin from './pages/Acceuiladmin.vue';
import Categories from './pages/Categorie.vue';
import Ajoutercategorie from './pages/Ajoutercategorie.vue';
import Ajouterproduit from './pages/Ajouterproduit.vue';
import Monpanier from './pages/Monpanier.vue';
import Modifierproduit from './pages/Modifierproduit.vue';
import Modifiercategorie from './pages/Modifiercategorie.vue';
import { createApp } from 'vue';
import 'vue-toastify/dist/vue-toastify.css';
import { ToastContainer } from 'vue-toastify';

const routes = [
  { path: '/', component: Index },
  { path: '/acceuil', component: Acceuil },
  { path: '/connexion', component: Connexion },
  { path: '/inscription', component: Inscription },
  { path: '/acceuiladmin', component: Acceuiladmin },
  { path: '/categorie', component: Categories },
  { path: '/addcategorie', component: Ajoutercategorie },
  { path: '/addproduit', component: Ajouterproduit },
  { path: '/editproduit/:id', component: Modifierproduit },
  { path: '/editcategorie/:id', component: Modifiercategorie },
  { path: '/panier', component: Monpanier },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default {
  components: {
    ToastContainer,
  },
  setup() {
    return {
      router,
    };
  },
};
</script>

<style>
/* Votre CSS ici */
</style>
