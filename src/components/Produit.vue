<template>
  <div class="bg-white p-4 rounded-lg shadow-md" :id="'post-' + produit.id">
    <img :src="`{{ asset('storage/' + produit.image_path) }}`" :alt="produit.categorie" class="w-full h-32 object-cover mb-2 rounded"/>
    <h2 class="text-xl font-semibold mb-2">{{ produit.designation }}</h2>
    <p>Prix : {{ produit.prix }} €</p>
    <button class="text-blue-500 mt-4 inline-block" @click="afficherPostComplet(produit.id)">Ajouter</button>
  </div>
</template>

<script>
export default {
  props: {
    produit: Object
  },
  methods: {
    afficherPostComplet(id) {
      // Implémentez ici la logique pour afficher le post complet
      console.log("ID du produit :", id);
    }
  }
}
</script>

<style scoped>
/* Ajoutez ici vos styles CSS si nécessaire */
</style>
