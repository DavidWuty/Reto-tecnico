<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="text-h5">🆕 Crear Nueva Tarea</v-card-title>
      <v-divider class="mb-4" />

      <v-form @submit.prevent="handleCreateTask">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="task.title"
              label="Título *"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="task.description"
              label="Descripción"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="task.tags"
              label="Tags (separados por coma)"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="task.date"
              label="Fecha (YYYY-MM-DD)"
              type="date"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="task.comments"
              label="Comentarios"
              rows="2"
            />
          </v-col>

          <v-col cols="12">
            <v-switch
              v-model="task.completed"
              label="¿Completada?"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="primary" type="submit">Guardar tarea</v-btn>
            <v-btn class="ml-2" color="secondary" @click="goBack">Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTasks } from "~/composables/useTasks";

const { addTask } = useTasks();
const router = useRouter();

const task = ref({
  title: "",
  description: "",
  comments: "",
  completed: false,
  tags: "",
  date: "",
});

const handleCreateTask = async () => {
  if (!task.value.title) {
    alert("El título es obligatorio");
    return;
  }

  try {
    await addTask(task.value);
    alert("✅ Tarea creada correctamente");
    router.push("/tasks"); // Redirige a la lista de tareas
  } catch (err) {
    console.error("Error al crear tarea:", err);
    alert("❌ No se pudo crear la tarea");
  }
};

const goBack = () => {
  router.push("/tasks");
};
</script>
