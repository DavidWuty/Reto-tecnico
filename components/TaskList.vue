<template>
  <v-container class="py-6">
    <v-row align="center" justify="space-between">
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold">Gestión de Tareas</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-right">
        <v-btn color="secondary" variant="outlined" class="mr-2" @click="toggleView">
          <v-icon left>
            {{ viewMode === 'cards' ? 'mdi-format-list-bulleted' : 'mdi-view-grid' }}
          </v-icon>
          {{ viewMode === 'cards' ? 'Vista lista' : 'Vista tarjetas' }}
        </v-btn>
        <v-btn color="primary" @click="openDialog()">Agregar tarea</v-btn>
      </v-col>
    </v-row>

    <!-- Vista tipo tarjetas -->
    <v-row v-if="viewMode === 'cards'">
      <v-col v-for="task in tasks" :key="task.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="ma-2" elevation="3">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ task.title }}</span>
            <v-chip :color="task.is_completed ? 'green' : 'red'" small label>
              {{ task.is_completed ? 'Completada' : 'Pendiente' }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <p v-if="task.description">{{ task.description }}</p>
            <p v-if="task.due_date"><strong>Fecha:</strong> {{ task.due_date }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="openTask(task.id)">Abrir</v-btn>
            <v-spacer />
            <v-btn icon color="blue" @click="openDialog(task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="removeTask(task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Vista tipo lista -->
    <v-table v-else>
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>
            <v-chip :color="task.is_completed ? 'green' : 'red'" small>
              {{ task.is_completed ? 'Completada' : 'Pendiente' }}
            </v-chip>
          </td>
          <td>{{ task.due_date || '—' }}</td>
          <td>
            <v-btn color="primary" size="small" @click="openTask(task.id)">Abrir</v-btn>
            <v-btn icon size="small" color="blue" @click="openDialog(task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" color="red" @click="removeTask(task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Diálogo para agregar o editar tarea -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ editMode ? 'Editar tarea' : 'Agregar tarea' }}</v-card-title>
        <v-card-text>
          <v-form ref="taskForm" v-model="valid">
            <v-text-field v-model="form.title" label="Título" :rules="[rules.required]" required />
            <v-switch v-model="form.is_completed" label="¿Completada?" />
            <v-text-field v-model="form.due_date" label="Fecha (YYYY-MM-DD)" />
            <v-textarea v-model="form.description" label="Descripción" />
            <v-textarea v-model="form.comments" label="Comentarios" />
            <v-text-field v-model="form.tags" label="Tags (separados por coma)" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">Cancelar</v-btn>
          <v-btn color="primary" @click="saveTask()">
            {{ editMode ? 'Guardar cambios' : 'Crear tarea' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTasks } from '~/composables/useTasks'

const router = useRouter()
const { getTasks, createTask, updateTask, deleteTask } = useTasks()

const tasks = ref<any[]>([])
const dialog = ref(false)
const valid = ref(false)
const editMode = ref(false)
const currentTaskId = ref<string | null>(null)
const viewMode = ref<'cards' | 'list'>('cards')

const form = ref({
  title: '',
  is_completed: false,
  due_date: '',
  comments: '',
  description: '',
  tags: '',
})

const rules = { required: (v: string) => !!v || 'Campo obligatorio' }

const loadTasks = async () => {
  try {
    const data = await getTasks()
    tasks.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error al cargar tareas:', error)
  }
}

const openDialog = (task: any = null) => {
  editMode.value = !!task
  currentTaskId.value = task?.id || null
  form.value = task
    ? { ...task }
    : { title: '', is_completed: false, due_date: '', comments: '', description: '', tags: '' }
  dialog.value = true
}

const closeDialog = () => (dialog.value = false)

const saveTask = async () => {
  if (!form.value.title) return
  try {
    if (editMode.value && currentTaskId.value) {
      await updateTask(currentTaskId.value, form.value)
    } else {
      // Genera ID temporal si la API no lo regresa
      const newTask = {
        ...form.value,
        id: crypto.randomUUID(),
      }
      await createTask(newTask)
    }
    await loadTasks()
    closeDialog()
  } catch (error) {
    console.error('Error al guardar tarea:', error)
  }
}

const removeTask = async (id: string) => {
  if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return
  try {
    await deleteTask(id)
    await loadTasks()
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
  }
}

const openTask = (id: string) => router.push(`/tasks/${id}`)

const toggleView = () => {
  viewMode.value = viewMode.value === 'cards' ? 'list' : 'cards'
}

onMounted(loadTasks)
</script>
