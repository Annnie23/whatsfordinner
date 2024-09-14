<!-- Vis roulettehjulet og opskrifterne. -->

<template>
  <div>
    <NavBar />
    <router-view /> <!-- Dette vil vise komponenterne baseret på din router konfiguration -->
    <h1>Velkommen til Opskriftsappen</h1>
    <button @click="fetchRecipes">Hent Opskrifter</button>
    <div v-for="recipe in recipes" :key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <img :src="recipe.imageUrl" alt="Opskriftsbillede" />
      <p>{{ recipe.description }}</p>
      <p>{{ recipe.ingredients }}</p>
    </div>
    <RecipePopup :recipe="selectedRecipe" :show="isPopupVisible" @close="isPopupVisible = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from './NavBar.vue';
import RouletteWheel from './RouletteWheel.vue';
import RecipePopup from './RecipePopup.vue';
import RecipeCounter from './RecipeCounter.vue';

import { useRecipes } from '../composables/useRecipes.ts';

const { recipes, fetchRecipes } = useRecipes();
const isPopupVisible = ref(false);
const selectedRecipe = ref(null);

const showPopup = (recipe) => {
  selectedRecipe.value = recipe;
  isPopupVisible.value = true;
};

onMounted(() => {
  fetchRecipes();
});
</script>
