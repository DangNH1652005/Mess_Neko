import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "../services/post.service";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],

    queryFn: ({ pageParam }) =>
      getPosts({
        cursor: pageParam,
      }),

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
