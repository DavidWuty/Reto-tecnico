<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">📋 Lista de Tareas</v-card-title>
      <v-divider class="mb-4" />

      <v-btn color="primary" class="mb-4" to="/tasks/create">➕ Nueva tarea</v-btn>

      <v-table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Completada</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.completed ? "✅ Sí" : "❌ No" }}</td>
            <td>{{ task.date || "—" }}</td>
            <td>
              <v-btn color="info" size="small" @click="openTask(task.id)">Abrir</v-btn>
              <v-btn color="warning" size="small" @click="editTask(task.id)">Editar</v-btn>
              <v-btn color="error" size="small" @click="removeTask(task.id)">Eliminar</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTasks, deleteTask } from "~/composables/useTasks"
import { useRouter } from "vue-router"

const router = useRouter()
const tasks = ref([])

const loadTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error("Error al cargar tareas:", error)
  }
}

async function removeTask(id: string) {
  try {
    await deleteTask(id)
    await loadTasks()
  } catch (error) {
    console.error("Error al eliminar tarea:", error)
  }
}

function openTask(id: string) {
  router.push(`/tasks/${id}`)
}

function editTask(id: string) {
  router.push(`/tasks/edit/${id}`)
}

onMounted(loadTasks)
</script>
