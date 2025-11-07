<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTasks } from "~/composables/useTasks";

const router = useRouter();
const { tasks, loadTasks, removeTask } = useTasks();

onMounted(() => {
  loadTasks();
});

function openTask(id: string) {
  router.push(`/tasks/${id}`);
}

function newTask() {
  router.push("/tasks/new");
}
</script>
