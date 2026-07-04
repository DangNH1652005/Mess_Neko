import React, { useState } from "react";
import { timeAgo } from "../utils/capitialize.util";
import { Send, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  useCommentsByPostId,
  useCreateComment,
  useDeleteComment,
} from "../hooks/comment.hook";
import useAuthUser from "../hooks/useAuthUser.hook";
import { useGetUserById } from "../hooks/user.hook";

const Comment = ({ postId }) => {
  const [content, setContent] = useState("");

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useCommentsByPostId(postId);

  const { authUser } = useAuthUser();
  const { user } = useGetUserById(authUser?._id);

  const { mutate: createComment, isPending: isCreating } =
    useCreateComment(postId);

  const { mutate: removeComment, isPending: isDeleting } =
    useDeleteComment(postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    createComment(
      { content: trimmed },
      {
        onSuccess: () => setContent(""),
      },
    );
  };

  const handleEdit = (cmt) => {
    // TODO: handle edit later
    console.log("Edit comment:", cmt);
  };

  const handleDelete = (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    removeComment(commentId);
  };

  return (
    <div>
      {/* Comment list */}
      <div className="px-5 py-3 space-y-4 max-h-64 overflow-y-auto">
        {isLoading && (
          <p className="text-sm text-base-content/50 text-center py-4">
            Loading comments...
          </p>
        )}

        {isError && (
          <p className="text-sm text-error text-center py-4">
            {error?.message || "Failed to load comments."}
          </p>
        )}

        {!isLoading && !isError && comments?.data?.length === 0 && (
          <p className="text-sm text-base-content/50 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}

        {comments?.data?.map((cmt) => {
          const isOwner = cmt.author?._id === authUser?._id;

          return (
            <div key={cmt._id} className="flex items-start gap-3 group">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-9 rounded-full">
                  {cmt.author?.profilePic ? (
                    <img
                      src={cmt.author.profilePic}
                      alt={cmt.author.fullName}
                    />
                  ) : (
                    <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {cmt.author?.fullName?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bubble comment + dropdown */}
              <div className="flex items-start gap-1 flex-1">
                <div className="bg-base-200 rounded-2xl px-4 py-2 flex-1">
                  <p className="font-semibold text-sm text-base-content">
                    {cmt.author?.fullName}
                  </p>
                  <p className="text-sm text-base-content/80">{cmt.content}</p>
                  <p className="text-xs text-base-content/40 mt-1">
                    {timeAgo(cmt.createdAt)}
                  </p>
                </div>

                {/* Dropdown - always visible, content differs based on ownership */}
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu menu-sm bg-base-100 rounded-box shadow-md z-10 w-40 p-1 border border-base-300"
                  >
                    {isOwner ? (
                      <>
                        <li>
                          <button
                            onClick={() => handleEdit(cmt)}
                            className="flex items-center gap-2 text-primary"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(cmt._id)}
                            disabled={isDeleting}
                            className="flex items-center gap-2 text-error"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <span className="text-base-content/40 cursor-not-allowed">
                          Not User
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comment input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 px-5 py-4 border-t border-base-300"
      >
        <div className="avatar">
          <div className="w-9 rounded-full">
            <img src={user?.profilePic} alt="your avatar" />
          </div>
        </div>
        <div className="flex-1 join w-full">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="input input-bordered input-sm join-item w-full"
            disabled={isCreating}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm join-item"
            disabled={isCreating || !content.trim()}
          >
            {isCreating ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
