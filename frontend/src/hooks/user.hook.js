import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user.service";

export const useGetUserById = (userId) => {
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    retry: false,
  });

  return {
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
    user: userQuery.data?.data,
  };
};
