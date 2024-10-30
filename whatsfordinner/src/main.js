import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import './style.css'; 
import { auth } from './modules/firebase'; // Importér `auth` fra `firebase.js`

const app = createApp(App);

app.use(router);
app.mount('#app');
