import { createApp } from 'vue';
  import { createWebHistory, createRouter } from 'vue-router';
import { ToastContainer } from 'vue-toastification';
import 'vue-toastification/dist/vue-toastification.css';
import App from './App.vue';
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

const app = createApp(App);
app.use(router);
app.component('ToastContainer', ToastContainer);
app.mount('#app');
