<template>
  <div v-if="show" class="popup" @click.self="close">
    <div class="popup-content">
      <span @click="close" class="close-button">&times;</span>
      <h2>{{ recipe.title }}</h2>
      <img :src="recipe.imageUrl" alt="Opskriftsbillede" />
      <p>{{ recipe.description }}</p>
      <p><strong>Ingredienser:</strong> {{ recipe.ingredients }}</p>
      <p><strong>Instruktioner:</strong> {{ recipe.instructions }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  recipe: Object,
  show: Boolean
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
