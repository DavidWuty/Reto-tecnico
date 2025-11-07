import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Proxy local
});

export const getTasks = async () => {
    const { data } = await api.get("/tasks");
    return data;
};

export const createTask = async (task: any) => {
    const { data } = await api.post("/tasks", task);
    return data;
};
