<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">📝 Crear nueva tarea</v-card-title>
      <v-divider class="mb-4" />

      <v-form @submit.prevent="saveTask">
        <v-text-field v-model="form.title" label="Título" required />
        <v-switch v-model="form.completed" label="¿Completada?" />
        <v-text-field v-model="form.date" label="Fecha" type="date" />
        <v-textarea v-model="form.description" label="Descripción" />
        <v-textarea v-model="form.comments" label="Comentarios" />
        <v-text-field v-model="form.tags" label="Tags (separados por comas)" />

        <v-btn type="submit" color="primary" class="mt-4">Guardar</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { createTask } from "~/composables/useTasks"
import { useRouter } from "vue-router"

const router = useRouter()
const form = ref({
  title: "",
  completed: false,
  date: "",
  description: "",
  comments: "",
  tags: "",
})

const saveTask = async () => {
  try {
    await createTask(form.value)
    router.push("/tasks")
  } catch (error) {
    console.error("Error al guardar tarea:", error)
  }
}
</script>
