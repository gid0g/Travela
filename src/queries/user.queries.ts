import client from "../config/axios.config";
import type { UserResponse } from "../types/auth.types";

const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await client.get<UserResponse>("/users/me");
    const profileData = response.data;

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profileData.full_name
    )}&size=400&background=656565&color=ffffff&bold=true`;

    return {
      ...profileData,
      fallback_image: fallbackAvatar,
    };
  } catch (error: any) {
    console.error("Error fetching user:", error);

    if (error.response?.status === 401) {
      throw new Error("Authentication required. Please log in again");
    } else if (error.response?.status === 403) {
      throw new Error("Access denied. Please check your permissions");
    } else if (error.response?.status === 404) {
      throw new Error("User profile not found");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Failed to fetch user profile. Please try again later");
    }
  }
};

export { getUser };
