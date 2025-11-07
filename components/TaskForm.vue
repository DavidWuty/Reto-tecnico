<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-text-field v-model="local.title" label="Título" :rules="[v => !!v || 'Título obligatorio']" required />

    <v-switch v-model="local.is_completed" label="Completada" />

    <v-text-field v-model="local.due_date" label="Fecha (YYYY-MM-DD)" />

    <v-textarea v-model="local.description" label="Descripción" />
    <v-textarea v-model="local.comments" label="Comentarios" />
    <v-text-field v-model="local.tags" label="Tags (separados por comas)" />

    <v-row class="mt-3">
      <v-col cols="6">
        <v-btn type="submit" color="primary">Guardar</v-btn>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn text @click="$emit('cancel')">Cancelar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const props = defineProps({ modelValue: Object })
const emit = defineEmits(['save', 'cancel'])

const local = reactive({
  title: props.modelValue?.title || '',
  is_completed: props.modelValue?.is_completed ? 1 : 0,
  due_date: props.modelValue?.due_date || '',
  comments: props.modelValue?.comments || '',
  description: props.modelValue?.description || '',
  tags: props.modelValue?.tags || ''
})

const onSubmit = () => {
  if (!local.title) return
  emit('save', { ...local })
}
</script>
