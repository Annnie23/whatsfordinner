<template>
  <div class="login-container">
    <Header />
    <div class="login-form">
      <h1>Hello admin</h1>
      <p>Login to access the admin dashboard</p>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsers } from '../modules/useUsers';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

const { login } = useUsers();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    router.push('/admin');
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F9F8F2;
}

.login-form {
  background-color: #FFFFFF;
  padding: 20px;
  margin-top: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h1 {
  color: #2E4B2A;
}

p {
  margin-bottom: 15px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #FFA500;
  color: #FFFFFF;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #FFD700;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
