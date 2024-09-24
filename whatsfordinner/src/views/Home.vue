<template>
  <div>
    <Header />
    <router-view />
    <h1>Whats For Dinner?</h1>
    <button @click="getRandomRecipe">Touch me</button>
    <div v-if="recipe">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'; // Importerer Header-komponenten
import { ref } from 'vue';

// En liste af opskrifter - IKKE OPRETTET I DATABASEN
const recipes = [
  { name: 'Pasta Carbonara', description: 'En lækker italiensk ret med æg og bacon.' },
  { name: 'Chili con Carne', description: 'Krydret kødsauce med bønner og chili.' },
  { name: 'Tomatsuppe', description: 'En klassisk tomatsuppe med basilikum.' }
];

const recipe = ref(null);

// Funktion til at få tilfældige opskrifter
const getRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  recipe.value = recipes[randomIndex];
};
</script>
