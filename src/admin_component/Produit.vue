<template>
  <div class="bg-white p-4 rounded-lg shadow-md" :id="'post-' + produit.id_produit">
    <img :src="`{{ asset('storage/' + produit.image_path) }}`" :alt="produit.categorie" class="w-full h-32 object-cover mb-2 rounded"/>
    <h2 class="text-xl font-semibold mb-2">{{ produit.designation }}</h2>
    <p>Prix : {{ produit.prix }} €</p>
    <router-link :to="{ path: '/editproduit', state: { id: produit.id_produit } }"><button class="text-white mr-4 p-2 border bg-yellow-500 inline-block">Modifier</button></router-link>
    <button @click="handleDelete(produit.id_produit)" :value="produit.designation" class="text-white p-2 border bg-red-500 inline-block delete">Supprimer</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  props: {
    produit: Object
  },
  setup() {
    const route = useRoute();

    const handleDelete = async (id) => {
      try {
        const url = 'http://localhost:3000/api/produit/deleteProduit';
        const requestBody = {
          id: id // Supposons que id contient l'ID du produit à supprimer
        };
        await axios.delete(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
          data: JSON.stringify(requestBody)
        });
        route.push('/acceuiladmin');
      } catch (error) {
        console.log(error);
        console.log('Erreur lors de la suppression du produit');
      }
    };

    return {
      handleDelete
    };
  }
}
</script>

<style scoped>
/* Ajoutez ici vos styles CSS si nécessaire */
</style>
