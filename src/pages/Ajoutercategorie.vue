<template>
    <div>
      <div class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Ajouter une Catégorie</h1>
          <form @submit.prevent="saveCategorie" enctype="multipart/form-data">
            <div class="mb-4">
              <label for="designation" class="text-left block text-gray-700">Désignation</label>
              <input v-model="designation" type="text" id="designation" name="designation" class="form-input mt-1 h-10 block w-full" placeholder="Nom de la catégorie" required />
            </div>
            <div class="mb-4">
              <label for="image" class="mt-1 text-left block text-gray-700">Image</label>
              <input v-model="image" type="text" id="image" name="image" class="form-input mt-1 h-10 block w-full" placeholder="Adresse de l'image" required />
            </div>
            <div class="mb-6 text-center">
              <button v-if="!isLoading" type="submit" class="mr-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:bg-blue-600 focus:outline-none">Valider</button>
              <router-link to="/categorie"><button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600 focus:bg-blue-600 focus:outline-none">Annuler</button></router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const designation = ref('');
      const image = ref('');
      const isLoading = ref(false);
      const toast = useToast();
      const router = useRouter();
  
      const saveCategorie = async () => {
        if (!designation.value) {
          toast.error('Veuillez remplir tous les champs obligatoires');
          return;
        }
        try {
          isLoading.value = true;
          const url = 'http://localhost:3000/api/categorie/addCategorie';
          const response = await axios.post(url, {
            designation: designation.value,
            image: image.value
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          toast.success(`Catégorie ${response.data.categorie} ajoutée avec succès`);
          isLoading.value = false;
          designation.value = '';
          image.value = '';
          router.push('/categorie');
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de l\'ajout de la catégorie');
          toast.error('Erreur lors de l\'ajout de la catégorie');
          isLoading.value = false;
        }
      };
  
      return {
        designation,
        image,
        isLoading,
        saveCategorie
      };
    }
  };
  </script>
  