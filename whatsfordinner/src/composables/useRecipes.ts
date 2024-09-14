// CRUD operationer for opskrifter.

import { ref, Ref } from 'vue';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebase-konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBW2wNjbtnHZ_BNh76fRoQIScbGj9cUkzA",
    authDomain: "whatsfordinner-de2e1.firebaseapp.com",
    projectId: "whatsfordinner-de2e1",
    storageBucket: "whatsfordinner-de2e1.appspot.com",
    messagingSenderId: "908882326022",
    appId: "1:908882326022:web:ee01060cc9b2128ad90987"
};

// Initialisering af Firebase-app og Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const recipesCollection = collection(db, 'recipes');

// Typedefinition for opskrift
type Recipe = {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string;
};

// Hook for opskrift CRUD-operationer
export function useRecipes() {
  // Initialiser recipes som en ref med en tom array
  const recipes: Ref<Recipe[]> = ref([]);

  // Hent opskrifter fra Firestore
  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(recipesCollection);
      // Mappe data til opskriftstype og opdatere recipes.value
      recipes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Recipe) }));
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  // Tilføj en ny opskrift til Firestore
  const addRecipe = async (recipe: Recipe) => {
    try {
      await addDoc(recipesCollection, recipe);
      await fetchRecipes(); // Opdater opskriftslisten efter tilføjelse
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  // Opdater en eksisterende opskrift i Firestore
  const updateRecipe = async (id: string, recipe: Partial<Recipe>) => {
    try {
      const recipeDoc = doc(db, 'recipes', id);
      await updateDoc(recipeDoc, recipe);
      await fetchRecipes(); // Opdater opskriftslisten efter opdatering
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  // Slet en opskrift fra Firestore
  const deleteRecipe = async (id: string) => {
    try {
      const recipeDoc = doc(db, 'recipes', id);
      await deleteDoc(recipeDoc);
      await fetchRecipes(); // Opdater opskriftslisten efter sletning
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return { recipes, fetchRecipes, addRecipe, updateRecipe, deleteRecipe };
}

