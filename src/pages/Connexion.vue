<template>
    <div>
      <div class="mb-2 text-center">
        <router-link to="/"><a class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Accueil</a></router-link>
      </div>
      <div v-if="!isLoading" class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Connexion</h1>
          <form @submit.prevent="connecter">
            <div class="mb-4">
              <label for="email" class="text-left block text-gray-700">Email</label>
              <input type="email" v-model="email" id="email" name="email" class="form-input mt-1 h-10 block w-full" placeholder="Votre email" required/>
            </div>
            <div class="mb-4">
              <label for="password" class="text-left block text-gray-700">Mot de passe</label>
              <input type="password" v-model="password" id="password" name="password" class="form-input mt-1 h-10 block w-full" placeholder="Votre mot de passe" required/>
            </div>
            <div class="mb-6 text-center">
              <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Se connecter</button>
            </div>
          </form>
          <p class="text-center text-gray-700">Vous n'avez pas de compte? <router-link to="/inscription" class="text-blue-500">S'inscrire</router-link></p>
        </div>
      </div>
      <div v-else class="bg-cover bg-center h-screen flex items-center">
        <div class="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6 text-center">Connexion</h1>
          <div class="text-center">
            <p>Veuillez patienter...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const isLoading = ref(false);
      const toast = useToast();
      const router = useRouter();
  
      const connecter = async () => {
        try {
          isLoading.value = true;
          const response = await axios.post('http://localhost:3000/api/user/login', { email: email.value, password: password.value });
          toast.success(`Connexion de l'utilisateur ${response.data.username} réussie avec succès`);
          isLoading.value = false;
          email.value = '';
          password.value = '';
          console.log('token', response.data.token);
          localStorage.setItem('token', response.data.token);
          if (response.data.role === 'admin') {
            router.push('/acceuiladmin');
          } else {
            router.push('/acceuil');
          }
        } catch (error) {
          console.log(error);
          toast.error('Email ou mot de passe incorrect');
          isLoading.value = false;
        }
      };
  
      return {
        email,
        password,
        isLoading,
        connecter
      };
    }
  };
  </script>
  