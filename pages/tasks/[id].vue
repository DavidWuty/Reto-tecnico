<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">Detalles de la tarea</v-card-title>
      <v-divider class="mb-4" />

      <div v-if="task">
        <p><strong>Título:</strong> {{ task.title }}</p>
        <p><strong>Completada:</strong> {{ task.completed ? "Sí" : "No" }}</p>
        <p><strong>Fecha:</strong> {{ task.date || "—" }}</p>
        <p><strong>Descripción:</strong> {{ task.description || "—" }}</p>
        <p><strong>Comentarios:</strong> {{ task.comments || "—" }}</p>
        <p><strong>Tags:</strong> {{ task.tags || "—" }}</p>
      </div>

      <v-btn color="primary" class="mt-4" to="/tasks">Volver</v-btn>
      <v-btn color="warning" class="mt-4" @click="editTask">Editar</v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getTaskById } from "~/composables/useTasks"

const route = useRoute()
const router = useRouter()
const task = ref(null)

onMounted(async () => {
  try {
    task.value = await getTaskById(route.params.id as string)
  } catch (error) {
    console.error("Error al cargar tarea:", error)
  }
})

const editTask = () => {
  router.push(`/tasks/edit/${route.params.id}`)
}
</script>
