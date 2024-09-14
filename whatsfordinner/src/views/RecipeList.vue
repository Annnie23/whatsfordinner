<template>
  <div>
    <div v-for="recipe in recipes" :key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <button @click="edit(recipe)">Edit</button>
      <button @click="deleteRecipeById(recipe.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecipes } from '../composables/useRecipes';

const { recipes, deleteRecipe } = useRecipes();

const emit = defineEmits(['delete', 'edit']);

const edit = (recipe) => {
  emit('edit', recipe.id, recipe);
};

const deleteRecipeById = (id) => {
  emit('delete', id);
};
</script>
