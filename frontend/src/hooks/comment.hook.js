import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentByPostId, getAllCommentByPostId } from '../services/post.service';
import { deleteComment } from '../services/comment.service';

export const useCommentsByPostId = (postId) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getAllCommentByPostId(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCommentByPostId(postId, data),
    onSuccess: () => {
      // Refetch comment list after creating a new comment
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};

export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};