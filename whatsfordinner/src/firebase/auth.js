// src/firebase/auth.js
import { auth } from './firebase'; // Importer auth fra firebase.js
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Funktion til at logge ind
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('authToken', userCredential.user.uid); // Gem brugerens ID som token
    return userCredential.user; // Returnér den loggede bruger
  } catch (error) {
    throw new Error(error.message); // Håndter fejl
  }
};

// Opdater logout-funktionen
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('authToken'); // Fjern token ved logout
  } catch (error) {
    throw new Error(error.message); // Håndter fejl
  }
};
