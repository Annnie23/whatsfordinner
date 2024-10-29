<template>
  <div>
    <Header />
    <router-view />
    <h1>Whats For Dinner?</h1>
    <button @click="getRandomRecipe">Touch me</button>
    <div v-if="recipe">
      <h2>{{ recipe.name }}</h2>
      <img :src="recipe.image" alt="Billede af {{ recipe.name }}" v-if="recipe.image" />
      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script setup>
/** import + destructuring */

import Header from '../components/Header.vue'; // Importerer Header-komponenten
import { ref, onMounted } from 'vue'; // onMounted for at hente data, når komponenten loades
import { db } from '../firebase/firebase'; // Importer din Firestore database instans
import { collection, getDocs } from 'firebase/firestore'; // Importer Firestore metoder

const recipes = ref([]); // Liste til opskrifterne fra databasen
const recipe = ref(null); // Den opskrift, der vises, når brugeren trykker på knappen

// Funktion til at hente opskrifter fra Firestore
const fetchRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, 'recipes')); // Hent alle dokumenter fra 'recipes' samlingen
  querySnapshot.forEach((doc) => {
    recipes.value.push({ ...doc.data() }); // Tilføj opskrifterne til recipes listen
  });
};

// Funktion til at få en tilfældig opskrift
const getRandomRecipe = () => {
  if (recipes.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * recipes.value.length);
    recipe.value = recipes.value[randomIndex]; // Vis tilfældig opskrift
  }
};

// Hent opskrifter, når komponenten loades
onMounted(() => {
  fetchRecipes();
});
</script>
