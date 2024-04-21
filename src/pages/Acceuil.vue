<template>
    <div>
      <template v-if="isLoading">
        <p>Merci de patienter</p>
      </template>
      <template v-else>
        <template v-if="Produits.length > 0">
          <nav class="flex justify-between items-center p-4 space-x-4 text-2xl font-bold bg-gray-300">
            <router-link to="/"><img class="text-left" src="" alt="Home" /></router-link>
            <div class="flex items-center flex-grow">
              <span class="text-blue-500 mx-auto">Liste des produits </span>
            </div>
            <router-link to="/connexion">Deconnexion</router-link>
          </nav>
          <div class="p-4">
            <template v-for="(categorie, index) in Categorie" :key="index">
              <button class="space-x-4 p-4 border text-center bg-blue-100" @click="getProduitByCategorie(categorie.id_categorie)">{{ categorie.designation }}</button>
            </template>
            <router-link to="/panier" class="bg-gray-900 text-white text-right p-4 border">Mon Panier</router-link>
          </div>
          <div class="mt-4" id="listeDesPosts">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
              <template v-for="(produit, index) in Produits" :key="index">
                <div class="bg-white p-4 rounded-lg shadow-md" :id="'post-' + produit.id">
                  <img :src="produit.image" :alt="produit.designation" class="w-full h-32 object-cover mb-2 rounded"/>
                  <h2 class="text-xl font-semibold mb-2">{{ produit.designation }}</h2>
                  <p>Prix : {{ produit.prix }} €</p>
                  <button class="text-blue-500 mt-4 inline-block" @click="ajouterPanier(produit.id_produit, produit.designation, produit.prix)">Ajouter</button>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <h1>Pas de produits</h1>
          <div>
            <button @click="getProduits" class="text-white mr-4 p-2 border bg-blue-500 inline-block">Retour</button>
          </div>
        </template>
      </template>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const Produits = ref([]);
      const Categorie = ref([]);
      const isLoading = ref(true);
      const router = useRouter();
  
      const getProduits = async () => {
        try {
          isLoading.value = true;
          const response = await axios.get('http://localhost:3000/api/produit/getProduit');
          Produits.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
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
        }
      };
  
      const ajouterPanier = async (id, designation, prix) => {
        try {
          const url = 'http://localhost:3000/api/panier/addPanier';
          const requestBody = {
            token: localStorage.getItem('token'),
            id_produit: id,
            designation: designation,
            prix: prix
          };
          await axios.post(url, requestBody);
          console.log('Produit ajouté au panier');
          // Vous pouvez utiliser toast ici
        } catch (error) {
          console.log(error);
        }
      };
  
      const getProduitByCategorie = async (id_categorie) => {
        try {
          const response = await axios.get('http://localhost:3000/api/produit/getProduitByCategorie', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            params: { id: id_categorie }
          });
          Produits.value = response.data;
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de la récupération des produits de la catégorie');
          isLoading.value = false;
        }
      };
  
      watchEffect(() => {
        getProduits();
        getCategorie();
      });
  
  
      return {
        Produits,
        Categorie,
        isLoading,
        ajouterPanier,
        getProduitByCategorie
      };
    }
  }
  </script>
  
  <style scoped>
  /* Ajoutez ici vos styles CSS si nécessaire */
  </style>
  