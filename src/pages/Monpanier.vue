<template>
    <div>
      <div v-if="isLoading" class="text-center">Merci de patienter</div>
      <div v-else>
        <div class="mb-2 text-center">
          <router-link to="/acceuil"><button class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none mr-10">Acceuil</button></router-link>
          <button @click="deleteAllPanier" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:bg-red-600 focus:outline-none">Vider mon panier</button>
        </div>
        <div class="bg-cover bg-center h-screen flex items-center">
          <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 class="text-3xl font-semibold mb-6 text-center">Mon Panier</h1>
            <form @submit.prevent="soumettrePanier">
              <div v-for="(produit, index) in produits" :key="index" class="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold">{{ produit.designation }}</h2>
                  <label class="text-gray-500">Prix unitaire : {{ produit.prix }} €</label>
                </div>
                <div class="flex items-center">
                  <input type="number" min="0" max="20" v-model="produit.quantityShow" @change="updateQuantite(index, produit.quantityShow)" class="w-16 h-8 text-center border border-gray-300 rounded-md mr-4"/>
                  <button @click="deleteFromPanier(produit.id_produit)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:bg-red-600 focus:outline-none">Supprimer</button>
                </div>
              </div>
              <div class="mb-6 text-center">
                <button type="submit" v-if="!isLoading" class="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Valider</button>
              </div>
            </form>
            <p class="text-center font-semibold">Total du panier : {{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const isLoading = ref(false);
      const produits = reactive([]);
      const total = ref(0);
      const toast = useToast();
      const router = useRouter();
  
      const getPanier = async () => {
        try {
          isLoading.value = true;
          const response = await axios.get('http://localhost:3000/api/panier/getPanier', {
            params: {
              token: localStorage.getItem('token')
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          produits.splice(0, produits.length, ...response.data.map(produit => {
            produit.quantityShow = produit.quantite;
            return produit;
          }));
          total.value = calculerTotal(produits);
          isLoading.value = false;
        } catch (error) {
          console.log(error);
        }
      };
  
      const deleteFromPanier = async (id) => {
        try {
          const url = 'http://localhost:3000/api/panier/deleteProduitPanier';
          const response = await axios.delete(url, {
            data: {
              token: localStorage.getItem('token'),
              id_produit: id
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          produits.splice(produits.findIndex(p => p.id_produit === id), 1);
          toast.success('Produit supprimé');
          getPanier();
        } catch (error) {
          console.log(error);
        }
      };
  
      const deleteAllPanier = async () => {
        try {
          const url = 'http://localhost:3000/api/panier/deleteAllPanier';
          await axios.delete(url, {
            data: {
              token: localStorage.getItem('token')
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          toast.success('Panier vidé');
          router.push('/acceuil');
        } catch (error) {
          console.log(error);
        }
      };
  
      const updateQuantite = (index, nouvelleQuantite) => {
        produits[index].quantityShow = nouvelleQuantite;
        if (nouvelleQuantite.length !== 0) produits[index].quantite = parseInt(nouvelleQuantite);
        total.value = calculerTotal(produits);
      };
  
      const soumettrePanier = (e) => {
        e.preventDefault();
        const totalValue = calculerTotal(produits);
        alert(`Le total du panier est de ${totalValue} €`);
      };
  
      const calculerTotal = (produits) => produits.reduce((acc, produit) => acc + produit.prix * produit.quantite, 0);
  
      onMounted(() => {
        getPanier();
      });
  
      return {
        isLoading,
        produits,
        total,
        deleteFromPanier,
        deleteAllPanier,
        updateQuantite,
        soumettrePanier
      };
    }
  };
  </script>
  