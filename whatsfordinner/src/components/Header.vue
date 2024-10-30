<template>
  <header>
    <nav>
      <router-link to="/">Whats For Dinner?</router-link>
      <router-link to="/login" v-if="!isLoggedIn"></router-link>
      <router-link to="/admin" v-if="isLoggedIn">Admin</router-link>
      <div class="auth-button">
        <button @click="toggleAuth">{{ isLoggedIn ? 'Logout' : 'Login' }}</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUsers } from '../modules/useUsers';
import { useRouter } from 'vue-router';

const { user, logout } = useUsers();
const router = useRouter();

const isLoggedIn = computed(() => !!user.value);

const toggleAuth = () => {
  if (isLoggedIn.value) {
    logout();
    router.push('/');
  } else {
    router.push('/login');
  }
};
</script>
  
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  background-color: #F9F8F2;
  color: #2E4B2A;
  z-index: 1000;
  display: flex;
  align-items: center;
}

header nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

header nav a {
  margin: 10px 10px;
  color: #2E4B2A;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  color: #FFCC00;
}

.auth-button {
  margin-left: auto;
  background-color: #FFA500;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #FFD700;
}
</style>
