<template>
  <div class="container mt-4">
    <h3>📋 Lista de Tareas</h3>
    <router-link to="/new" class="btn btn-primary mb-3">+ Nueva Tarea</router-link>

    <table class="table table-striped">
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
          <td>{{ task.isCompleted ? "✅ Sí" : "❌ No" }}</td>
          <td>{{ task.due_date || "-" }}</td>
          <td>
            <router-link :to="`/task/${task.id}`" class="btn btn-info btn-sm">Abrir</router-link>
            <router-link :to="`/edit/${task.id}`" class="btn btn-warning btn-sm mx-1">Editar</router-link>
            <button class="btn btn-danger btn-sm" @click="removeTask(task.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getTasks, deleteTask } from "@/api/tasksApi";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  async mounted() {
    await this.loadTasks();
  },
  methods: {
    async loadTasks() {
      try {
        const data = await getTasks();
        this.tasks = data;
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    },
    async removeTask(id) {
      if (confirm("¿Deseas eliminar esta tarea?")) {
        await deleteTask(id);
        this.loadTasks();
      }
    },
  },
};
</script>
