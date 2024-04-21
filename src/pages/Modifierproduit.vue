<template>
    <div>
      <div v-if="isLoading" class="text-center">Merci de patienter</div>
      <div v-else>
        <div v-if="categories.length > 0" class="bg-cover bg-center h-screen flex items-center">
          <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 class="text-3xl font-semibold mb-6 text-center">Modifier un Produit</h1>
            <form @submit.prevent="updateProduit" enctype="multipart/form-data">
              <div class="mb-4">
                <label for="designation" class="text-left block text-gray-700">Designation</label>
                <input type="text" id="designation" v-model="designation" class="form-input mt-1 h-10 block w-full" placeholder="Nom du produit" required/>
              </div>
              <div class="mb-4">
                <label for="prix" class="text-left block text-gray-700">Prix</label>
                <input type="text" id="prix" v-model="prix" class="form-input mt-1 h-10 block w-full" placeholder="Prix du produit" required/>
              </div>
              <div class="mb-4">
                <label>Choisir une catégorie :</label>
                <select name="categories" id="categories" v-model="categorie" class="form-select mt-1 h-10 block w-full" required>
                  <option v-for="(cat, index) in categories" :key="index" :value="cat.id_categorie">{{ cat.designation }}</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="image" class="mt-1 text-left block text-gray-700">Image</label>
                <input type="text" id="image" v-model="image" class="form-input mt-1 h-10 block w-full" placeholder="Adresse de l'image" required/>
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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const isLoading = ref(true);
      const designation = ref('');
      const categorie = ref('');
      const prix = ref('');
      const nom_cat = ref('');
      const image = ref('');
      const categories = ref([]);
      const toast = useToast();
      const router = useRouter();
  
      const getCategories = async () => {
        try {
          isLoading.value = true;
          const response = await axios.get('http://localhost:3000/api/categorie/getCategorie');
          categories.value = response.data;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
        }
      };
  
      const id_p = router.currentRoute.value.params.id;
  
      const getProduit = async () => {
        try {
          isLoading.value = true;
          const url = `http://localhost:3000/api/produit/getProduitById`;
          const response = await axios.get(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            params: {
              id: id_p
            }
          });
          getCategorie(response.data[0].categorie);
          designation.value = response.data[0].designation;
          prix.value = response.data[0].prix;
          categorie.value = response.data[0].categorie;
          image.value = response.data[0].image;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de la récupération du produit');
          isLoading.value = false;
        }
      };
  
      const getCategorie = async (id) => {
        try {
          isLoading.value = true;
          const url = 'http://localhost:3000/api/categorie/getCategorieById';
          const response = await axios.get(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            },
            params: {
              id: id
            }
          });
          nom_cat.value = response.data[0].designation;
          isLoading.value = false;
        } catch (error) {
          console.log(error);
        }
      };
  
      const updateProduit = async () => {
        try {
          if (!designation.value || !prix.value || !categorie.value) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
          }
          isLoading.value = true;
          const url = 'http://localhost:3000/api/produit/updateProduit';
          const response = await axios.put(url, {
            id: id_p,
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
          toast.success(`Produit ${designation.value} modifié avec succès`);
          isLoading.value = false;
          router.push('/acceuiladmin');
        } catch (error) {
          console.log(error);
          console.log('Erreur lors de la modification du produit');
          toast.error('Erreur lors de la modification du produit');
          isLoading.value = false;
        }
      };
  
      onMounted(() => {
        getProduit();
        getCategories();
      });
  
      return {
        isLoading,
        designation,
        prix,
        categorie,
        image,
        categories,
        updateProduit
      };
    }
  };
  </script>
  