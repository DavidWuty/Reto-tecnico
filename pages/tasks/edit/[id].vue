<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">✏️ Editar Tarea</v-card-title>
      <v-divider class="mb-4" />

      <v-form @submit.prevent="updateExistingTask">
        <v-text-field v-model="form.title" label="Título" required />
        <v-switch v-model="form.completed" label="¿Completada?" />
        <v-text-field v-model="form.date" label="Fecha" type="date" />
        <v-textarea v-model="form.description" label="Descripción" />
        <v-textarea v-model="form.comments" label="Comentarios" />
        <v-text-field v-model="form.tags" label="Tags (separados por comas)" />

        <v-btn type="submit" color="primary" class="mt-4">Actualizar</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getTaskById, updateTask } from "~/composables/useTasks"

const router = useRouter()
const route = useRoute()
const form = ref({
  title: "",
  completed: false,
  date: "",
  description: "",
  comments: "",
  tags: "",
})

onMounted(async () => {
  try {
    const data = await getTaskById(route.params.id as string)
    form.value = data
  } catch (error) {
    console.error("Error al cargar tarea:", error)
  }
})

const updateExistingTask = async () => {
  try {
    await updateTask(route.params.id as string, form.value)
    router.push("/tasks")
  } catch (error) {
    console.error("Error al actualizar tarea:", error)
  }
}
</script>
