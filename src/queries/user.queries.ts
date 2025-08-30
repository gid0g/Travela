import client from "../config/axios.config";
import { toast } from "react-toastify";
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
    toast.error(
      "Error fetching user: " + (error.response?.data?.detail ?? "Unknown error")
    );
    throw error;
  }
};

export { getUser };
