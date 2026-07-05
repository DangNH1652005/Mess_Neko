import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostByPostId, unlikePostByPostId } from "../services/post.service";

const updatePostInCache = (queryClient, postId, isLikedValue, likesDelta) => {
  const toggle = (p) =>
    p._id === postId
      ? { ...p, isLiked: isLikedValue, likesCount: p.likesCount + likesDelta }
      : p;

  const updater = (old) => {
    if (!old) return old;
    if (Array.isArray(old.data?.posts)) {
      return { ...old, data: { ...old.data, posts: old.data.posts.map(toggle) } };
    }
    if (old.data?._id) {
      return { ...old, data: toggle(old.data) };
    }
    return old;
  };

  queryClient.setQueriesData({ queryKey: ["posts"] }, updater);
  queryClient.setQueryData(["post", postId], updater);
};

const rollback = (queryClient, context) => {
  context?.previousPosts?.forEach(([key, data]) => {
    queryClient.setQueryData(key, data);
  });
  if (context?.previousPost) {
    queryClient.setQueryData(["post", context.postId], context.previousPost);
  }
};

const snapshot = async (queryClient, postId) => {
  await queryClient.cancelQueries({ queryKey: ["posts"] });
  await queryClient.cancelQueries({ queryKey: ["post", postId] });

  return {
    previousPosts: queryClient.getQueriesData({ queryKey: ["posts"] }),
    previousPost: queryClient.getQueryData(["post", postId]),
    postId,
  };
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => likePostByPostId(postId),

    onMutate: async (postId) => {
      const context = await snapshot(queryClient, postId);
      updatePostInCache(queryClient, postId, true, 1);
      return context;
    },

    onError: (_err, _postId, context) => rollback(queryClient, context),

    onSettled: (_data, _err, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => unlikePostByPostId(postId),

    onMutate: async (postId) => {
      const context = await snapshot(queryClient, postId);
      updatePostInCache(queryClient, postId, false, -1);
      return context;
    },

    onError: (_err, _postId, context) => rollback(queryClient, context),

    onSettled: (_data, _err, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};