<template>
    <div>
      <div v-if="isLoading" class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Catégories</h1>
          <div class="p-4 flex items-center">
            <div class="text-left mr-40 border">
              <router-link to="/addcategorie" class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 focus:bg-green-600 focus:outline-none mr-10">Ajouter une Catégorie</router-link>
            </div>
          </div>
          <div class="mt-4" id="listeDesPosts">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
              <div v-for="(cat, index) in categories" :key="index" class="bg-white p-4 rounded-lg shadow-md">
                <img :src="cat.image" :alt="cat.designation" class="w-full h-32 object-cover mb-2 rounded" />
                <h2 class="text-xl font-semibold mb-2">{{ cat.designation }}</h2>
                <router-link :to="`/editcategorie/${cat.id_categorie}`" class="text-white mr-4 p-2 border bg-yellow-500 inline-block">Modifier</router-link>
                <button @click="handleDelete(cat.id_categorie)" class="text-white p-2 border bg-red-500 inline-block">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Pas de catégorie</h1>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const categories = ref([]);
      const isLoading = ref(true);
      const toast = useToast();
      const route = useRoute();
  
      const getCategorie = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/categorie/getCategorie');
          categories.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
        }
      };
  
      const handleDelete = async (id) => {
        try {
          const url = 'http://localhost:3000/api/categorie/deleteCategorie';
          const response = await axios.delete(url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            data: { id: id }
          });
          toast.success('Catégorie supprimée');
          categories.value = categories.value.filter(cat => cat.id_categorie !== id);
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de la suppression de la catégorie');
          toast.error('Erreur lors de la suppression de la catégorie');
        }
      };
  
      onMounted(getCategorie);
  
      return {
        categories,
        isLoading,
        handleDelete
      };
    }
  };
  </script>
  