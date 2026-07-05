import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { getVisibilityConfig } from "../constants/visibility.constant";
import { Link } from "react-router";
import { useLikePost, useUnlikePost } from "../hooks/like.hook";

const PostCard = ({ post }) => {
  const {
    _id,
    author,
    content,
    images,
    visibility,
    likesCount,
    commentsCount,
    createdAt,
    isLiked,
  } = post;

  const config = getVisibilityConfig(post.visibility);
  const Icon = config.icon;

  const { mutate: likePost, isPending: isLiking } = useLikePost();
  const { mutate: unlikePost, isPending: isUnliking } = useUnlikePost();

  const isPending = isLiking || isUnliking;

   const handleLikeToggle = () => {
    if (isPending) return;
    isLiked ? unlikePost(_id) : likePost(_id);
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl">
      <div className="card-body pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={author.profilePic} alt={author.fullName} />
              </div>
            </div>
            <div>
              <h2 className="font-semibold">{author.fullName}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-base-content/60">
                <span>{new Date(createdAt).toLocaleString()}</span>
                <span>•</span>
                <span className={`badge badge-sm gap-1 ${config.className}`}>
                  <Icon className="size-3" />
                  {config.label}
                </span>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {content && (
          <p className="whitespace-pre-wrap text-base mt-3">{content}</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="px-4 pb-4">
          {images.length === 1 ? (
            <img
              src={images[0].url}
              alt=""
              className="rounded-xl w-full object-cover max-h-[550px]"
            />
          ) : (
            <div className="grid gap-2 grid-cols-2">
              {images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt=""
                  className="rounded-xl aspect-square object-cover"
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-2 text-sm flex justify-between text-base-content/70">
        <span>{likesCount} likes</span>
        <span>{commentsCount} comments</span>
      </div>

      <div className="divider my-0" />

      <div className="grid grid-cols-2">
        <button
          className={`btn btn-ghost rounded-none ${isLiked ? "text-error" : ""}`}
          onClick={handleLikeToggle}
          disabled={isPending}
        >
          <Heart size={18} className={isLiked ? "fill-error" : ""} />
          Like
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-ghost rounded-none">
          <MessageCircle size={18} />
          Comment
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
