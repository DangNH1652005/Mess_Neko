import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, getPostDetail, getPosts } from "../services/post.service";

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

export const usePostDetail = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
  });
};
