// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importer getAuth fra Firebase Auth
import { getFirestore } from 'firebase/firestore';

// Din Firebase-konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBW2wNjbtnHZ_BNh76fRoQIScbGj9cUkzA",
    authDomain: "whatsfordinner-de2e1.firebaseapp.com",
    projectId: "whatsfordinner-de2e1",
    storageBucket: "whatsfordinner-de2e1.appspot.com",
    messagingSenderId: "908882326022",
    appId: "1:908882326022:web:ee01060cc9b2128ad90987"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialiser auth
const db = getFirestore(app); // Initialiser Firestore

// Eksporter app, auth og db
export { app, auth, db };
