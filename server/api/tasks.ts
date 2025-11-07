// server/api/tasks.js
import axios from "axios";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const token = config.public.apiToken;
    const apiUrl = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/";

    const method = event.node.req.method;
    const body = method === "POST" ? await readBody(event) : null;

    try {
        if (method === "GET") {
            const { data } = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } else if (method === "POST") {
            const { data } = await axios.post(apiUrl, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return data;
        } else {
            throw createError({
                statusCode: 405,
                statusMessage: "HTTP method is not allowed.",
            });
        }
    } catch (error) {
        console.error("❌ Error al conectar con la API externa:", error.message);
        throw createError({
            statusCode: 500,
            statusMessage: "Error al comunicarse con la API externa.",
        });
    }
});
