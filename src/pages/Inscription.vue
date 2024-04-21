<template>
    <div>
      <div class="mb-2 text-center">
        <router-link to="/"><a class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Acceuil</a></router-link>
      </div>
      <div class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Inscription</h1>
          <form @submit.prevent="inscrire">
            <div class="mb-4">
              <label for="nom" class="text-left block text-gray-700">Nom</label>
              <input type="text" id="nom" v-model="nom" class="form-input mt-1 h-10 block w-full" placeholder="Votre nom" required/>
            </div>
            <div class="mb-4">
              <label for="prenom" class="text-left block text-gray-700">Prénom</label>
              <input type="text" id="prenom" v-model="prenom" class="form-input mt-1 h-10 block w-full" placeholder="Votre prénom" required/>
            </div>
            <div class="mb-4">
              <label for="email" class="text-left block text-gray-700">Email</label>
              <input type="email" id="email" v-model="email" class="form-input mt-1 h-10 block w-full" placeholder="Votre email" required/>
            </div>
            <div class="mb-4">
              <label for="password" class="text-left block text-gray-700">Mot de passe</label>
              <input type="password" id="password" v-model="password" class="form-input mt-1 h-10 block w-full" placeholder="Votre mot de passe" required/>
            </div>
            <div class="mb-6 text-center">
              <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">S'inscrire</button>
            </div>
          </form>
          <p class="text-center text-gray-700">Vous avez déjà un compte? <router-link to="/connexion"><a class="text-blue-500">Connexion</a></router-link></p>
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
      const nom = ref('');
      const prenom = ref('');
      const email = ref('');
      const password = ref('');
      const isLoading = ref(false);
      const toast = useToast();
      const router = useRouter();
  
      const inscrire = async () => {
        try {
          isLoading.value = true;
          const response = await axios.post('http://localhost:3000/api/user/register', {
            firstname: nom.value,
            name: prenom.value,
            email: email.value,
            password: password.value
          });
          toast.success(`Inscription de l'utilisateur ${response.data.username} réussie avec succès`);
          isLoading.value = false;
          router.push('/connexion');
        } catch (error) {
          console.log(error);
          toast.error("Erreur lors de l'inscription");
          isLoading.value = false;
        }
      };
  
      return {
        nom,
        prenom,
        email,
        password,
        isLoading,
        inscrire
      };
    }
  };
  </script>
  