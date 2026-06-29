import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../services/post.service";

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
