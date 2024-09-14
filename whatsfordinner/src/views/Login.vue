<!-- Login-formular til admin-brugere. -->

<template>
  <div>
    <h1>Log Ind</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Log Ind</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const auth = getAuth();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/'); // Redirect to home page after login
  } catch (error) {
    console.error("Login failed: ", error);
  }
};
</script>
