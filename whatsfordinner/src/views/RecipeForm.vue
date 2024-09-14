<template>
  <form @submit.prevent="submitForm">
    <input v-model="title" placeholder="Title" required />
    <input v-model="imageUrl" placeholder="Image URL" />
    <textarea v-model="description" placeholder="Description"></textarea>
    <textarea v-model="ingredients" placeholder="Ingredients"></textarea>
    <textarea v-model="instructions" placeholder="Instructions"></textarea>
    <button type="submit">Save Recipe</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const imageUrl = ref('');
const description = ref('');
const ingredients = ref('');
const instructions = ref('');

const emit = defineEmits(['submit']);

const submitForm = () => {
  emit('submit', {
    title: title.value,
    imageUrl: imageUrl.value,
    description: description.value,
    ingredients: ingredients.value,
    instructions: instructions.value
  });
};
</script>
