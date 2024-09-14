<!-- Navigation og betinget visning baseret på brugerstatus. -->

<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';

  import { useAuth } from '../composables/useAuth';
  import { computed } from 'vue';
  
  const { isAuthenticated, logout } = useAuth();
  </script>
  