// Håndter brugerlogin og logout.

import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBW2wNjbtnHZ_BNh76fRoQIScbGj9cUkzA",
    authDomain: "whatsfordinner-de2e1.firebaseapp.com",
    projectId: "whatsfordinner-de2e1",
    storageBucket: "whatsfordinner-de2e1.appspot.com",
    messagingSenderId: "908882326022",
    appId: "1:908882326022:web:ee01060cc9b2128ad90987"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function useAuth() {
  const isAuthenticated = ref(false);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      isAuthenticated.value = true;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      isAuthenticated.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  return { isAuthenticated, login, logout };
}
