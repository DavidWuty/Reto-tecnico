import { defineEventHandler, readBody } from "h3";
import axios from "axios";

const API_URL = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks";
const TOKEN =
    "Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";

export default defineEventHandler(async (event) => {
    const method = event.method;
    const { id } = event.context.params!;

    try {
        if (method === "GET") {
            const res = await axios.get(`${API_URL}/${id}`, {
                headers: { Authorization: TOKEN },
            });
            return res.data;
        }

        if (method === "PUT") {
            const body = await readBody(event);
            const formData = new URLSearchParams({
                title: body.title,
                is_completed: body.is_completed ? "1" : "0",
                due_date: body.due_date || "",
                comments: body.comments || "",
                description: body.description || "",
                tags: body.tags || "",
            });

            const res = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return res.data;
        }

        if (method === "DELETE") {
            const res = await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: TOKEN },
            });
            return res.data;
        }

        return { error: "Método no permitido" };
    } catch (error: any) {
        console.error("❌ Error proxy /tasks/[id]:", error.response?.data || error);
        return { error: error.response?.data || "Error en el proxy" };
    }
});
