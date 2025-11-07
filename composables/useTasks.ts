// src/api/tasksApi.js
import axios from "axios";

const API_URL = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks";
const TOKEN =
    "Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
    },
});

// 🔹 Obtener todas las tareas
export const getTasks = async () => {
    const res = await api.get("/");
    return res.data;
};

// 🔹 Obtener tarea por ID
export const getTaskById = async (id) => {
    const res = await api.get(`/${id}`);
    return res.data;
};

// 🔹 Crear una nueva tarea
export const createTask = async (task) => {
    const res = await api.post("/", task);
    return res.data;
};

// 🔹 Actualizar tarea
export const updateTask = async (id, updatedTask) => {
    const res = await api.put(`/${id}`, updatedTask);
    return res.data;
};

// 🔹 Eliminar tarea
export const deleteTask = async (id) => {
    const res = await api.delete(`/${id}`);
    return res.data;
};
