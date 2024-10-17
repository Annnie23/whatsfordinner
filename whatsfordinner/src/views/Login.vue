<template>
    <div>
    <Header />
    <router-view />
      <h1>Hello admin
      </h1>
        <br>     
      <p>Login to access the admin dashboard</p>
      <br>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { login } from '../firebase/auth'; // Importer login-funktionen
  import { useRouter } from 'vue-router'; // Importer useRouter
  import Header from '../components/Header.vue'; // Importer Header-komponenten
  
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
  