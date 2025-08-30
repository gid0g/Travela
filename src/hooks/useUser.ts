import { useCookies } from "react-cookie";
import { loginUser, registerUser } from "../action/auth.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUser } from "../queries/user.queries";
import { toast } from "react-toastify";
import { useUserStore } from "../store/user.store";
import type { AxiosError } from "axios";

export const useLoginUser = () => {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      navigate("/home");
      setCookie("access_token", data.access_token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), 
      });

      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getUser,
      });
      toast.success("Login successful");

      setUser(user);
      console.log("user", user);
    },
    onError: async (error: any) => {
      const err = error as AxiosError<{ detail?: string }>;

      toast.error(
        "Login failed: " + (err.response?.data?.detail ?? "Unknown error")
      );
    },
  });
};

export const useSignUpUser = () => {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (_, variables) => {
      try {
        const loginResponse = await loginUser({
          username: variables?.email, 
          password: variables.password,
        });

        setCookie("access_token", loginResponse.access_token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });

        const user = await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: getUser,
        });

        setUser(user);
        toast.success("Registration + Login successful!");
        navigate("/home");
      } catch (err: any) {
        toast.error(
          "Signup succeeded but login failed. Please login manually."
        );
        console.error("Auto-login error", err);
      }
    },
    
    onError: async (error: any) => {
      const err = error as AxiosError<{ detail?: string }>;
      toast.error(
        "Registration failed: " +
          (err.response?.data?.detail ?? "Unknown error")
      );
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
