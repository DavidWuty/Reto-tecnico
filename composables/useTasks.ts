import { ref } from "vue";
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "~/api/tasksApi";

const tasks = ref([]);

export const useTasks = () => {
    const loadTasks = async () => {
        const data = await getTasks();
        tasks.value = data.content || [];
    };

    const addTask = async (task: any) => {
        const newTask = await createTask(task);
        tasks.value.push(newTask);
    };

    const editTask = async (id: string, updatedTask: any) => {
        await updateTask(id, updatedTask);
        await loadTasks();
    };

    const removeTask = async (id: string) => {
        await deleteTask(id);
        await loadTasks();
    };

    const fetchTask = async (id: string) => {
        return await getTaskById(id);
    };

    return { tasks, loadTasks, addTask, editTask, removeTask, fetchTask };
};
