<template>
  <div class="container">
    <Header />
    <router-view />
    <h1>Whats For Dinner?</h1>
    <button @click="getRandomRecipe">Touch me</button>
    <div v-if="recipe" class="recipe-container">
      <h2>{{ recipe.name }}</h2>
      <img :src="recipe.image" alt="Billede af {{ recipe.name }}" v-if="recipe.image" class="recipe-image"/>
      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import { ref, onMounted } from 'vue';
import { db } from '../modules/firebase';
import { collection, getDocs } from 'firebase/firestore';

const recipes = ref([]);
const recipe = ref(null);

const fetchRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  recipes.value = querySnapshot.docs.map(doc => doc.data());
};

const getRandomRecipe = () => {
  if (recipes.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * recipes.value.length);
    recipe.value = recipes.value[randomIndex];
  } else {
    alert('No recipes available.');
  }
};

onMounted(fetchRecipes);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #F9F8F2;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2E4B2A;
  text-align: center;
  margin-bottom: 20px;
}

button {
  background-color: #FFA500;
  color: #FFFFFF;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
}

button:hover {
  background-color: #FFD700;
}

.recipe-container {
  margin-top: 20px;
  text-align: center;
}

.recipe-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin: 10px 0;
}

h2 {
  color: #2E4B2A;
}

p {
  color: #333;
  font-size: 1.1rem;
}
</style>
