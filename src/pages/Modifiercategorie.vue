<template>
    <div>
      <div v-if="isLoading" class="text-center">Merci de patienter</div>
      <div v-else>
        <div class="bg-cover bg-center h-screen flex items-center">
          <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 class="text-3xl font-semibold mb-6 text-center">Modifier une catégorie</h1>
            <form @submit.prevent="updateCategorie" enctype="multipart/form-data">
              <div class="mb-4">
                <label for="designation" class="text-left block text-gray-700">Designation</label>
                <input type="text" id="designation" v-model="designation" class="form-input mt-1 h-10 block w-full" placeholder="Nom de la catégorie" required/>
              </div>
              <div class="mb-4">
                <label for="image" class="mt-1 text-left block text-gray-700">Image</label>
                <input type="text" id="image" v-model="image" class="form-input mt-1 h-10 block w-full" placeholder="Adresse de l'image" required/>
              </div>
              <div class="mb-6 text-center">
                <button type="submit" class="mr-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:bg-blue-600 focus:outline-none">Valider</button>
                <router-link to="/categorie"><button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600 focus:bg-blue-600 focus:outline-none">Annuler</button></router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const isLoading = ref(false);
      const designation = ref('');
      const image = ref('');
      const route = useRoute();
      const toast = useToast();
      const router = useRouter();
  
      const getProduit = async () => {
        try {
          isLoading.value = true;
          const id_p = route.params.id;
          const response = await axios.get('http://localhost:3000/api/categorie/getCategorieById', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            params: { id: id_p }
          });
          designation.value = response.data[0].designation;
          image.value = response.data[0].image;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
          toast.error('Erreur lors de la récupération du produit');
          isLoading.value = false;
        }
      };
  
      const updateCategorie = async () => {
        try {
          if (!designation.value || !image.value) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
          }
          isLoading.value = true;
          const id_p = route.params.id;
          const response = await axios.put('http://localhost:3000/api/categorie/updateCategorie', {
            id: id_p,
            designation: designation.value,
            image: image.value
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          toast.success(`Catégorie ${designation.value} modifiée avec succès`);
          isLoading.value = false;
          router.push('/categorie');
        } catch (error) {
          console.log(error);
          toast.error('Erreur lors de la modification de la catégorie');
          isLoading.value = false;
        }
      };
  
      getProduit();
  
      return {
        isLoading,
        designation,
        image,
        updateCategorie
      };
    }
  };
  </script>
  