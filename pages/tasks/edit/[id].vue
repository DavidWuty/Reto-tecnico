<template>
  <div class="container mt-4">
    <h3>🆕 Crear Nueva Tarea</h3>

    <form @submit.prevent="addTask">
      <div class="mb-3">
        <label>Título *</label>
        <input v-model="task.title" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Descripción</label>
        <textarea v-model="task.description" class="form-control"></textarea>
      </div>

      <div class="mb-3">
        <label>Comentarios</label>
        <input v-model="task.comments" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Tags</label>
        <input v-model="task.tags" type="text" class="form-control" placeholder="Ej. trabajo, urgente" />
      </div>

      <div class="mb-3">
        <label>Fecha</label>
        <input v-model="task.due_date" type="date" class="form-control" />
      </div>

      <div class="form-check mb-3">
        <input v-model="task.isCompleted" class="form-check-input" type="checkbox" id="isCompleted" />
        <label class="form-check-label" for="isCompleted">Completada</label>
      </div>

      <button class="btn btn-success">Guardar Tarea</button>
    </form>
  </div>
</template>

<script>
import { createTask } from "@/api/tasksApi";

export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        comments: "",
        tags: "",
        due_date: "",
        isCompleted: false,
      },
    };
  },
  methods: {
    async addTask() {
      try {
        await createTask(this.task);
        alert("✅ Tarea creada correctamente");
        this.$router.push("/tasks");
      } catch (error) {
        console.error("Error al crear tarea:", error);
      }
    },
  },
};
</script>
