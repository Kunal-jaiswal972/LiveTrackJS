import axios from "axios";

const API_URL =
  (import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_SERVER_URL) + "/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
