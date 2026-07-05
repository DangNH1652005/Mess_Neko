import React, { useEffect } from "react";
import { useParams } from "react-router";
import { usePostDetail } from "../hooks/post.hook";
import { getPostDetail } from "../services/post.service";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { Heart, MessageCircle, Send, Share2, ThumbsUp } from "lucide-react";
import { timeAgo } from "../utils/capitialize.util";
import Comment from "../components/Comment";
import { useLikePost, useUnlikePost } from "../hooks/like.hook";

const PostDetailPage = () => {
  const { id } = useParams();

  const { data: post, isLoading, isError, error } = usePostDetail(id);
  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: unlikePost, isPending: isUnliking } = useUnlikePost();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage error={error?.message} />;
  }

  if (!post) {
    return <ErrorMessage error={"Can not find post"} />;
  }

  const {
    author,
    content,
    images,
    likesCount,
    commentsCount,
    createdAt,
    isLiked,
  } = post.data;

  const isPending = isLiking || isUnliking;

  const handleLikeToggle = () => {
    if (isPending) return;
    isLiked ? unlikePost(id) : likePost(id);
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-box shadow-md border border-base-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
        <h2 className="font-semibold text-lg text-base-content">
          {author?.fullName}'s Post
        </h2>
        <button className="btn btn-ghost btn-sm btn-circle">✕</button>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 px-5 pt-4">
        <div className="avatar">
          <div className="w-11 rounded-full">
            {author?.profilePic ? (
              <img src={author.profilePic} alt={author.fullName} />
            ) : (
              <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center">
                <span className="text-lg font-medium">
                  {author?.fullName?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold text-base-content leading-tight">
            {author?.fullName}
          </p>
          <p className="text-sm text-base-content/60">{timeAgo(createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-3">
        <p className="text-base-content whitespace-pre-line leading-relaxed">
          {content}
        </p>
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="px-5 pt-4">
          <div
            className={`grid gap-2 ${
              images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {images.map((img) => (
              <img
                key={img._id || img.publicId}
                src={img.url}
                alt="post-image"
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-5 pt-4 text-sm text-base-content/60">
        <div className="flex items-center gap-1">
          <span className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <ThumbsUp className="w-3 h-3" />
            </span>
            <span className="w-5 h-5 rounded-full bg-error text-error-content flex items-center justify-center">
              <Heart className="w-3 h-3" />
            </span>
          </span>
          <span>{likesCount} likes</span>
        </div>
        <span>{commentsCount} comments</span>
      </div>

      <div className="divider my-2 px-5"></div>

      {/* Action buttons */}
      <div className="flex items-center justify-around px-5 pb-2 text-base-content/70">
        <button
          className={`btn btn-ghost btn-sm gap-2 flex-1 ${isLiked ? "text-error" : ""}`}
          onClick={handleLikeToggle}
          disabled={isPending}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-error" : ""}`} />
          Like
        </button>
        <button className="btn btn-ghost btn-sm gap-2 flex-1">
          <MessageCircle className="w-4 h-4" />
          Comment
        </button>
        <button className="btn btn-ghost btn-sm gap-2 flex-1">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      <div className="divider my-0"></div>
      <Comment postId={id} />
    </div>
  );
};

export default PostDetailPage;
