<template>
  <Header />
  <router-view />
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <form @submit.prevent="addNewRecipe">
      <input v-model="newRecipe.name" placeholder="Recipe name" required />
      <input v-model="newRecipe.description" placeholder="Recipe description" required />
      <input v-model="newRecipe.image" placeholder="Recipe picture URL" required />
      <button type="submit">Add recipe</button>
    </form>

    <h2>Existing recipes</h2>
    <div class="recipe-grid">
      <div v-for="(recipe, index) in recipes" :key="index" class="recipe-item">
        <h3>{{ recipe.name }}</h3>
        <img :src="recipe.image" alt="Billede af {{ recipe.name }}" v-if="recipe.image" />
        <p>{{ recipe.description }}</p>
        <div class="button-container">
          <button @click="editRecipe(index)">Edit</button>
          <button @click="handleDeleteRecipe(index)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="editingIndex !== null" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="cancelEdit">&times;</button>
        <h2>Edit Recipe</h2>
        <form @submit.prevent="saveUpdatedRecipe">
          <input v-model="editedRecipe.name" required />
          <input v-model="editedRecipe.description" required />
          <input v-model="editedRecipe.image" required />
          <button type="submit">Update Recipe</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import { fetchRecipes, addRecipe, updateRecipe, deleteRecipe as deleteRecipeFromService } from '../modules/recipesService';

const recipes = ref([]);
const newRecipe = ref({ name: '', description: '', image: '' });
const editingIndex = ref(null);
const editedRecipe = ref({ name: '', description: '', image: '' });

onMounted(async () => {
    recipes.value = await fetchRecipes();
});

const addNewRecipe = async () => {
    await addRecipe(newRecipe.value);
    newRecipe.value = { name: '', description: '', image: '' };
    recipes.value = await fetchRecipes();
};

const editRecipe = (index) => {
    editingIndex.value = index;
    editedRecipe.value = { ...recipes.value[index] };
};

const saveUpdatedRecipe = async () => {
    const recipeId = recipes.value[editingIndex.value].id;
    await updateRecipe(recipeId, editedRecipe.value);
    editingIndex.value = null;
    recipes.value = await fetchRecipes();
};

const handleDeleteRecipe = async (index) => {
    const recipeId = recipes.value[index].id;
    await deleteRecipeFromService(recipeId);
    recipes.value = await fetchRecipes();
};

const cancelEdit = () => {
    editingIndex.value = null;
};
</script>



    
<style scoped>
.admin-dashboard {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #F9F8F2;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

form {
    margin-bottom: 20px;
}

input {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button-container {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
}

button {
    background-color: #FFA500;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1rem;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #FFD700;
}

.recipe-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.recipe-item {
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin: 10px;
    flex: 1 1 21%;
    max-width: 250px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.recipe-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #FFFFFF;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
}

.modal-content h2 {
    margin-top: 0;
    color: #2E4B2A;
}

.modal-content input {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-content button {
    background-color: #FFA500;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin-top: 10px;
    transition: background-color 0.3s;
}

.modal-content button:hover {
    background-color: #FFD700;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #2E4B2A;
}

.modal-close:hover {
    color: #FFA500;
}

@media (max-width: 768px) {
    .recipe-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .recipe-item {
        max-width: 100%;
        max-height: 300px;
    }

    button {
        padding: 8px 12px;
        font-size: 0.9rem;
    }

    .modal-content {
        width: 90%;
    }

    h2, .modal-content h2 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .recipe-grid {
        grid-template-columns: 1fr;
    }

    h2, .modal-content h2 {
        font-size: 1.3rem;
    }

    button {
        padding: 6px 10px;
        font-size: 0.8rem;
    }
}
</style>


