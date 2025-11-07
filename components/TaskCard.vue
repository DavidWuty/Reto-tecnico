<template>
  <v-card class="mb-3">
    <v-card-title>
      <div>
        <div class="text-h6">{{ task.title }}</div>
        <div class="text-caption">{{ formatDate(task.due_date) }}</div>
      </div>
      <v-spacer />
      <v-switch v-model="localCompleted" inset @change="toggleComplete" />
    </v-card-title>

    <v-card-text>
      <div v-if="task.description">{{ task.description }}</div>
      <div v-if="task.comments" class="mt-2"><strong>Comentarios:</strong> {{ task.comments }}</div>
      <div v-if="task.tags" class="mt-2"><strong>Tags:</strong> {{ task.tags }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="$emit('open', task)">Abrir</v-btn>
      <v-btn text color="error" @click="$emit('delete', task)">Eliminar</v-btn>
      <v-btn text color="primary" @click="$emit('edit', task)">Editar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({ task: Object })
const emit = defineEmits(['open', 'delete', 'edit'])

const localCompleted = ref(Boolean(props.task?.is_completed))

watch(() => props.task?.is_completed, (v) => {
  localCompleted.value = Boolean(v)
})

const toggleComplete = () => {
  emit('edit', { ...props.task, is_completed: localCompleted.value ? 1 : 0 })
}

const formatDate = (d: string) => {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
  }
}
</script>
