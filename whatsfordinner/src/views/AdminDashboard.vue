<template>
  <div>
    <h1>Admin Dashboard</h1>
    <RecipeForm @submit="addRecipe" />
    <RecipeList @delete="deleteRecipe" @edit="editRecipe" />
  </div>
</template>

<script setup>
import RecipeForm from './RecipeForm.vue';
import RecipeList from './RecipeList.vue';
import { useRecipes } from '../composables/useRecipes';

const { addRecipe, deleteRecipe, updateRecipe } = useRecipes();

const editRecipe = (id, updatedRecipe) => {
  updateRecipe(id, updatedRecipe);
};
</script>
