<template>
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <form @submit.prevent="addRecipe">
        <input v-model="newRecipe.name" placeholder="Opskriftens navn" required />
        <input v-model="newRecipe.description" placeholder="Opskriftens beskrivelse" required />
        <button type="submit">Tilføj Opskrift</button>
      </form>
  
      <h2>Eksisterende Opskrifter</h2>
      <ul>
        <li v-for="(recipe, index) in recipes" :key="index">
          <h3>{{ recipe.name }}</h3>
          <p>{{ recipe.description }}</p>
          <button @click="editRecipe(index)">Rediger</button>
          <button @click="deleteRecipe(index)">Slet</button>
        </li>
      </ul>
  
      <div v-if="editingIndex !== null">
        <h2>Rediger Opskrift</h2>
        <form @submit.prevent="updateRecipe">
          <input v-model="editedRecipe.name" required />
          <input v-model="editedRecipe.description" required />
          <button type="submit">Opdater Opskrift</button>
          <button @click="cancelEdit">Annuller</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // En liste af opskrifter (kan ændres til at hente fra en database senere)
  const recipes = ref([
    { name: 'Pasta Carbonara', description: 'En lækker italiensk ret med æg og bacon.' },
    { name: 'Chili con Carne', description: 'Krydret kødsauce med bønner og chili.' },
  ]);
  
  const newRecipe = ref({ name: '', description: '' });
  const editingIndex = ref(null);
  const editedRecipe = ref({ name: '', description: '' });
  
  // Funktion til at tilføje opskrift
  const addRecipe = () => {
    recipes.value.push({ ...newRecipe.value });
    newRecipe.value = { name: '', description: '' }; // Reset inputfelter
  };
  
  // Funktion til at redigere opskrift
  const editRecipe = (index) => {
    editingIndex.value = index;
    editedRecipe.value = { ...recipes.value[index] };
  };
  
  // Funktion til at opdatere opskrift
  const updateRecipe = () => {
    recipes.value[editingIndex.value] = { ...editedRecipe.value };
    editingIndex.value = null; // Stop redigering
  };
  
  // Funktion til at slette opskrift
  const deleteRecipe = (index) => {
    recipes.value.splice(index, 1);
  };
  
  // Funktion til at annullere redigering
  const cancelEdit = () => {
    editingIndex.value = null;
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  input {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  