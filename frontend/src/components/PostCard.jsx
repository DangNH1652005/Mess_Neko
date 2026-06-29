import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

const PostCard = ({ post }) => {
  const { author, content, images, likesCount, commentsCount, createdAt } =
    post;

  console.log(images);
  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl">
      {/* Header */}
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

              <p className="text-sm text-base-content/60">
                {new Date(createdAt).toLocaleString()}
              </p>
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

      {/* Images */}
      {images.length > 0 && (
        <div className="px-4 pb-4">
          {images.length === 1 ? (
            <img
              src={images[0].url}
              alt=""
              className="rounded-xl w-full object-cover max-h-[550px]"
            />
          ) : (
            <div
              className={`grid gap-2 ${
                images.length === 2 ? "grid-cols-2" : "grid-cols-2"
              }`}
            >
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

      {/* Stats */}
      <div className="px-4 py-2 text-sm flex justify-between text-base-content/70">
        <span>{likesCount} lượt thích</span>

        <span>{commentsCount} bình luận</span>
      </div>

      <div className="divider my-0" />

      {/* Actions */}
      <div className="grid grid-cols-2">
        <button className="btn btn-ghost rounded-none">
          <Heart size={18} />
          Thích
        </button>

        <button className="btn btn-ghost rounded-none">
          <MessageCircle size={18} />
          Bình luận
        </button>
      </div>
    </div>
  );
};

export default PostCard;
