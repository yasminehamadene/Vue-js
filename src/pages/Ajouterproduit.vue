<template>
    <div>
      <div v-if="isLoading" class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Ajouter un Produit</h1>
          <form @submit.prevent="saveProduit">
            <div class="mb-4">
              <label for="designation" class="text-left block text-gray-700">Désignation</label>
              <input v-model="designation" type="text" id="designation" name="designation" class="form-input mt-1 h-10 block w-full" placeholder="Nom du produit" required />
            </div>
            <div class="mb-4">
              <label for="prix" class="text-left block text-gray-700">Prix</label>
              <input v-model="prix" type="text" id="prix" name="prix" class="form-input mt-1 h-10 block w-full" placeholder="Prix du produit" required />
            </div>
            <div class="mb-4">
              <label>Choisir une catégorie :</label>
              <select v-model="categorie" id="categories" class="form-select mt-1 h-10 block w-full">
                <option v-for="(cat, index) in categories" :key="index" :value="cat.id_categorie">{{ cat.designation }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="image" class="mt-1 text-left block text-gray-700">Image</label>
              <input v-model="image" type="text" id="image" name="image" class="form-input mt-1 h-10 block w-full" placeholder="Adresse de l'image" required />
            </div>
            <div class="mb-6 text-center">
              <button type="submit" class="mr-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:bg-blue-600 focus:outline-none">Valider</button>
              <router-link to="/acceuiladmin"><button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600 focus:bg-blue-600 focus:outline-none">Annuler</button></router-link>
            </div>
          </form>
        </div>
      </div>
      <div v-else>
        <h1>Veuillez ajouter une catégorie en premier</h1>
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
      const categories = ref([]);
      const isLoading = ref(true);
      const designation = ref('');
      const prix = ref('');
      const categorie = ref('');
      const image = ref('');
      const toast = useToast();
      const route = useRoute();
      const router = useRouter();
  
      const saveProduit = async () => {
        if (!designation.value || !prix.value || !categorie.value) {
          toast.error('Veuillez remplir tous les champs obligatoires');
          return;
        }
        try {
          isLoading.value = true;
          const url = 'http://localhost:3000/api/produit/addProduit';
          const response = await axios.post(url, {
            designation: designation.value,
            prix: prix.value,
            categorie: categorie.value,
            image: image.value
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          });
          toast.success(`Produit ${response.data.designation} ajouté avec succès`);
          isLoading.value = false;
          designation.value = '';
          prix.value = '';
          categorie.value = '';
          image.value = '';
          router.push('/acceuiladmin');
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de l\'ajout du produit');
          toast.error('Erreur lors de l\'ajout du produit');
          isLoading.value = false;
        }
      };
  
      const getCategorie = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/categorie/getCategorie');
          categories.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
        }
      };
  
      onMounted(getCategorie);
  
      return {
        categories,
        isLoading,
        designation,
        prix,
        categorie,
        image,
        saveProduit
      };
    }
  };
  </script>
  