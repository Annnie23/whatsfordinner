<!-- src/components/RecipeCounter.vue -->
<template>
    <div class="counter">
      <p>Antal opskrifter: {{ recipeCount }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRecipes } from '../composables/useRecipes';
  
  const { recipes } = useRecipes();
  const recipeCount = computed(() => recipes.value.length);
  </script>
  
  <style scoped>
  .counter {
    margin-top: 20px;
  }
  </style>
  