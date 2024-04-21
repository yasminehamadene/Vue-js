<template>
    <div>
      <div v-if="isLoading" class="text-center">Merci de patienter</div>
      <div v-else>
        <div v-if="Produits.length > 0">
          <nav class="flex justify-between items-center p-4 space-x-4 text-2xl font-bold bg-gray-300">
            <router-link to="/"><img class="text-left" src="" alt="Home" /></router-link>
            <div class="flex items-center flex-grow">
              <span class="text-blue-500 mx-auto">Liste des produits</span>
            </div>
            <router-link to="/connexion" class="border">Connexion</router-link>
          </nav>
          <div class="p-4">
            <button v-for="(categorie, index) in Categorie" :key="index" class="space-x-4 p-4 border text-center bg-blue-100" @click="getProduitByCategorie(categorie.id_categorie)">{{ categorie.designation }}</button>
          </div>
          <div class="mt-4" id="listeDesPosts">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
              <div v-for="(produit, index) in Produits" :key="index" class="bg-white p-4 rounded-lg shadow-md" :id="'post-' + produit.id">
                <img :src="produit.image" :alt="produit.designation" class="w-full h-32 object-cover mb-2 rounded"/>
                <h2 class="text-xl font-semibold mb-2">{{ produit.designation }}</h2>
                <p>Prix : {{ produit.prix }} €</p>
                <button class="text-blue-500 mt-4 inline-block" @click="seconnecter">Ajouter</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1>Pas de produits</h1>
          <button @click="getProduits" class="text-white mr-4 p-2 border bg-blue-500 inline-block">Retour</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const Produits = ref([]);
      const Categorie = ref([]);
      const isLoading = ref(true);
      const toast = useToast();
      const route = useRoute();
      const router = useRouter();
  
      const getProduits = async () => {
        try {
          isLoading.value = true;
          const response = await axios.get('http://localhost:3000/api/produit/getProduit');
          Produits.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
          toast.error('Une erreur est survenue lors de la récupération des produits');
          isLoading.value = false;
        }
      };
  
      const getCategorie = async () => {
        try {
          isLoading.value = true;
          const response = await axios.get('http://localhost:3000/api/categorie/getCategorie');
          Categorie.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
          toast.error('Une erreur est survenue lors de la récupération des catégories');
          isLoading.value = false;
        }
      };
  
      const seconnecter = () => {
        toast.error("Merci de vous connecter avant d'ajouter un produit au panier");
        router.push('/connexion');
      };
  
      const getProduitByCategorie = async (id_categorie) => {
        try {
          const response = await axios.get('http://localhost:3000/api/produit/getProduitByCategorie', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            params: {
              id: id_categorie
            }
          });
          Produits.value = response.data;
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de la récupération des produits de la catégorie');
          isLoading.value = false;
        }
      };
  
      onMounted(() => {
        getProduits();
        getCategorie();
      });
  
      return {
        Produits,
        Categorie,
        isLoading,
        seconnecter,
        getProduitByCategorie,
        getProduits
      };
    }
  };
  </script>
  