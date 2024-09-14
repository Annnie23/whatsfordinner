<!-- Viser opskrifterne i kortformat. -->

<!-- src/components/RecipeCard.vue -->
<template>
  <div class="recipe-card">
    <h2>{{ recipe.title }}</h2>
    <button @click="openPopup">View Recipe</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  recipe: Object
});

const openPopup = () => {
  // Funktion til at åbne opskriftsdetaljer popup
};
</script>

<style scoped>
.recipe-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
}
</style>
