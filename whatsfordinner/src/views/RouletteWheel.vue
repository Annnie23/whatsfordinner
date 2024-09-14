<!-- src/components/RouletteWheel.vue -->
<template>
    <div class="roulette-container">
      <button @click="spinWheel">Spin</button>
      <div class="roulette-wheel" :style="wheelStyle"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const spinWheel = () => {
    // Logik for at spinne hjulet
  };
  
  const wheelStyle = ref({
    // Stil for roulettehjulet
  });
  </script>
  
  <style scoped>
  .roulette-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .roulette-wheel {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(/* Farver og sektioner */);
    transition: transform 2s ease-out;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
  }
  </style>
  