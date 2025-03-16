import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333"
    : process.env.NEXT_PUBLIC_API_URL || "https://patoleague-api.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
