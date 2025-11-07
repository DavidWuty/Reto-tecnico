<template>
  <v-app>
    <!-- 🔝 Navbar -->
    <v-app-bar color="primary" dark flat>
      <v-toolbar-title class="font-weight-bold">🧩 Gestor de Tareas</v-toolbar-title>

      <v-spacer />

      <!-- 🔗 Navegación -->
      <v-btn variant="text" color="white" to="/">Inicio</v-btn>
      <v-btn variant="text" color="white" to="/tasks">Tareas</v-btn>
      <v-btn variant="text" color="white" to="/tasks/create">Nueva tarea</v-btn>
    </v-app-bar>

    <!-- 🧠 Contenido dinámico -->
    <v-main class="pa-6">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// No se requiere lógica aquí
</script>

<style scoped>
.v-main {
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>
