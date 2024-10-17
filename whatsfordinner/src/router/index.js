import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue'; // Importer login-komponenten
import Header from '../components/Header.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; // Importér AdminDashboard


const routes = [
  { path: '/', name: 'Home', component: Home }, // Rute til forsiden
  { path: '/login', name: 'Login', component: Login }, // Rute til login-siden
  { path: '/header', name: 'Header', component: Header }, // Rute til header-komponenten
  { path: '/admin', component: AdminDashboard }, // Tilføj denne rute

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adgangskontrol for admin-siden
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Antager, at du gemmer et token i localStorage
    if (to.path === '/admin' && !isAuthenticated) {
      next('/login'); // Omdiriger til login, hvis ikke logget ind
    } else {
      next(); // Fortsæt til den ønskede rute
    }
  });

export default router;
