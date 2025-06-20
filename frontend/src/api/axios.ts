import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

// 👉 Log de cada request
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("➡️ Request:", config.method?.toUpperCase(), (config.baseURL ?? '') + config.url);
    return config;
});

// 👉 Log de cada response
instance.interceptors.response.use(
    response => {
        console.log("✅ Response:", response.status, response.config.url, response.data);
        return response;
    },
    error => {
        if (error.response) {
            console.error("❌ Error response:", error.response.status, error.response.data);
        } else {
            console.error("❌ Error (sin respuesta):", error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
