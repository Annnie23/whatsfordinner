<template>
    <header>
      <nav>
        <router-link to="/">Whats For Dinner?</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Header Styles */
header {
  position: fixed; /* Får headeren til at forblive øverst */
  top: 0; /* Sætter headeren til at være helt i toppen */
  left: 0; /* Sørger for, at headeren strækker sig ud til venstre */
  right: 0; /* Sørger for, at headeren strækker sig ud til højre */
  padding: 10px 20px; /* Indvendig margen */
  background-color: #007BFF; /* Blå farve */
  color: white;
  z-index: 1000; /* Sikrer, at headeren er oven på andre elementer */
}

header nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  color: #FFCC00; /* Gult ved hover */
}

  </style>
  