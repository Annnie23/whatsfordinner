import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export const fetchRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const addRecipe = async (recipe) => {
    await setDoc(doc(db, 'recipes', recipe.name), recipe);
};

export const updateRecipe = async (recipeId, updatedRecipe) => {
    const recipeRef = doc(db, 'recipes', recipeId);
    await updateDoc(recipeRef, updatedRecipe);
};

export const deleteRecipe = async (recipeId) => {
    const recipeRef = doc(db, 'recipes', recipeId);
    await deleteDoc(recipeRef);
};
