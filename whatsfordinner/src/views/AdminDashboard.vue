<template>
  <Header />
  <router-view />
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <form @submit.prevent="addRecipe">
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
        <button @click="deleteRecipe(index)">Delete</button>
    
  </div>
  </div>
</div>


<div v-if="editingIndex !== null" class="modal-overlay">
  <div class="modal-content">
    <button class="modal-close" @click="cancelEdit">&times;</button>
    <h2>Edit Recipe</h2>
    <form @submit.prevent="updateRecipe">
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
  import Header from '../components/Header.vue'; // Importer Header-komponenten
  import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'; // Importer setDoc
  import { db } from '../firebase/firebase'; // Importer Firestore-databasen

  // Reaktive variabler
  const recipes = ref([]);
  const newRecipe = ref({ name: '', description: '', image: '' }); // Fjern steps
  const editingIndex = ref(null);
  const editedRecipe = ref({ name: '', description: '', image: '' }); // Fjern steps

  // Funktion til at hente opskrifter fra Firestore
  const fetchRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    recipes.value = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Vi gemmer også dokumentets ID, så vi kan opdatere/slette det senere
      ...doc.data(),
    }));
  };

  // Kald funktionen til at hente opskrifter, når komponenten er indlæst
  onMounted(() => {
    fetchRecipes();
  });

  // Funktion til at tilføje en ny opskrift til Firestore
  const addRecipe = async () => {
  // Tilføj opskriften til Firestore uden steps
  await setDoc(doc(db, 'recipes', newRecipe.value.name), {
    name: newRecipe.value.name,
    description: newRecipe.value.description,
    image: newRecipe.value.image // URL til billedet
  });

  // Nulstil inputfelterne
  newRecipe.value = { name: '', description: '', image: '' };

  // Opdater opskriftslisten efter tilføjelsen
  fetchRecipes();
};




  // Funktion til at redigere en opskrift
  const editRecipe = (index) => {
    editingIndex.value = index;
    editedRecipe.value = { ...recipes.value[index] };
  };

  // Funktion til at opdatere en opskrift i Firestore
  const updateRecipe = async () => {
  const recipeId = recipes.value[editingIndex.value].id; // Hent opskriftens ID
  const recipeRef = doc(db, 'recipes', recipeId);

  try {
    // Opdater opskriften i Firestore uden steps
    await updateDoc(recipeRef, {
      name: editedRecipe.value.name,
      description: editedRecipe.value.description,
      image: editedRecipe.value.image // Opdater billedet
    });
    // Hent opskrifter igen efter opdatering
    fetchRecipes();
    // Stop redigering
    editingIndex.value = null;
  } catch (error) {
    console.error('Fejl ved opdatering af opskrift: ', error);
  }
};



  // Funktion til at slette en opskrift fra Firestore
  const deleteRecipe = async (index) => {
    const recipeId = recipes.value[index].id; // Hent opskriftens ID
    const recipeRef = doc(db, 'recipes', recipeId);

    try {
      // Slet opskriften fra Firestore
      await deleteDoc(recipeRef);
      // Hent opskrifter igen efter sletning
      fetchRecipes();
    } catch (error) {
      console.error('Fejl ved sletning af opskrift: ', error);
    }
  };

  // Funktion til at annullere redigering
  const cancelEdit = () => {
    editingIndex.value = null;
  };
  </script>

    
<style scoped>
  .admin-dashboard {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
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
  bottom: 10px; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;

}


  button:hover {
    background-color: #0056b3;
  }

  /* Grid styling for recipes */
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .recipe-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 10px;
  flex: 1 1 21%; /* Giver en flex-basis så de kan være 4 på stribe */
  max-width: 250px; /* Sætter en maksimal bredde på opskriftsboksen */
  max-height: 400px; /* Sætter en maksimal højde på opskriftsboksen */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrerer indholdet i boksen */
  overflow: hidden;
  position: relative;
}


.recipe-item img {
  width: 100%; /* Billedet fylder bredden af boksen */
  height: 150px; /* Fast højde for billederne */
  object-fit: cover; /* Sikrer at billedet skaleres korrekt uden at ændre forholdet */
  border-radius: 8px;
  margin-bottom: 10px;
}
  /* Modal styling */
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
    background: #fff;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .modal-content h2 {
    margin-top: 0;
  }

  .modal-content input {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .modal-content button {
    margin-top: 10px;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .modal-close:hover {
    color: #007BFF;
  }



</style>
