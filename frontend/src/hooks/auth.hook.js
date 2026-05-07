import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, signup } from "../services/auth.service";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, loginMutation: mutate };
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, signupMutation: mutate };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, logoutMutation: mutate };
};
