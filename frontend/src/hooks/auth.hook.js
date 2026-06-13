import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { login, logout, signup, verifyOtp } from "../services/auth.service";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, loginMutation: mutate };
};

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data, variables) => {
      localStorage.setItem("email", variables.email);
      toast.success(data.message || "Verification code sent to your email");
      navigate(`/verify-otp`);
    },
  });

  return { error, isPending, signupMutation: mutate };
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      localStorage.removeItem("email");
      toast.success("Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/onboarding");
    },
  });

  return { error, isPending, verifyOtpMutation: mutate };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, logoutMutation: mutate };
};
