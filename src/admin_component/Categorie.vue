<template>
  <div class="bg-white p-4 rounded-lg shadow-md" :id="'post-' + categorie.id">
    <img :src="`{{ asset('storage/' + categorie.image_path) }}`" :alt="categorie.designation" class="w-full h-32 object-cover mb-2 rounded"/>
    <h2 class="text-xl font-semibold mb-2">{{ categorie.designation }}</h2>
    <p>Prix : {{ categorie.prix }} €</p>
    <router-link to="/updateproduit"><button class="text-white mr-4 p-2 border bg-yellow-500 inline-block">Modifier</button></router-link>
    <router-link to="/supprimerproduit"><button class="text-white p-2 border bg-red-500 inline-block">Supprimer</button></router-link>
  </div>
</template>

<script>
export default {
  props: {
    categorie: Object
  }
}
</script>

<style scoped>
/* Ajoutez ici vos styles CSS si nécessaire */
</style>
