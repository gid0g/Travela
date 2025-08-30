import axios from "axios";
import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

const cookies = new Cookies();

client.interceptors.request.use((config) => {
  const token = cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookies.remove("access_token", { path: "/" });

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default client;

