// Håndter roulettehjulet og opskriftsvalg.

import { ref } from 'vue';

export function useRoulette(recipes) {
  const selectedRecipe = ref(null);

  const spinRoulette = () => {
    const randomIndex = Math.floor(Math.random() * recipes.value.length);
    selectedRecipe.value = recipes.value[randomIndex];
    return selectedRecipe.value;
  };

  return { selectedRecipe, spinRoulette };
}
