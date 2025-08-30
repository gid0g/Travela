import client from "../config/axios.config";

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

    if (error.response?.status === 401) {
      throw new Error("Invalid username or password");
    } else if (error.response?.status === 422) {
      throw new Error("Please check your input and try again");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Login failed. Please try again later");
    }
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
  } catch (error: any) {
    console.error("Register error:", error);

    // Handle specific error cases
    if (error.response?.status === 400) {
      if (error.response.data?.detail?.includes("Email already registered")) {
        throw new Error(
          "Email is already registered. Please use a different email or try logging in"
        );
      }
      throw new Error(
        "Invalid registration data. Please check your information"
      );
    } else if (error.response?.status === 422) {
      throw new Error("Please check your input and try again");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Registration failed. Please try again later");
    }
  }
};
