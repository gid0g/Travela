import client from "../config/axios.config";
import { toast } from "react-toastify";
export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const form = new URLSearchParams();
    form.append("username", data.username ?? "");
    form.append("password", data.password ?? "");

    const response = await client.post("/auth/login", form.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (data: {
  fullName?: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}) => {
  try {
    const payload = {
      full_name: data.fullName ?? data.name ?? "",
      email: data.email,
      password: data.password,
    };
    const response = await client.post("/auth/register", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    toast.error("Registration failed");
    console.error("Register error:", error);
    throw error;
  }
};
