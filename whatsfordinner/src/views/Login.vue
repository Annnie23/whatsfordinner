<template>
    <div>
      <Header />
      <h1>Log Ind</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Adgangskode" required />
        <button type="submit">Log Ind</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { login } from '../firebase/auth'; // Importer login-funktionen
  import { useRouter } from 'vue-router'; // Importer useRouter
  
  const router = useRouter(); // Opret router instans
  
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      router.push('/admin'); // Naviger til admin-dashboardet efter login
    } catch (error) {
      errorMessage.value = error.message; // Sæt fejlmeddelelse
    }
  };
  </script>
  
  <style scoped>
  /* Dine stilarter her */
  </style>
  