import React, { useRef, useState } from "react";
import { Image, Smile, Share2, X, Globe, Users, Lock } from "lucide-react";
import { VISIBILITY } from "../constants/visibility.constant";
import { useCreatePost } from "../hooks/post.hook";
import Loading from "./Loading";
import { useGetUserById } from "../hooks/user.hook";

const CreatePost = ({ userId }) => {
  const { isLoading, isError, error, user } = useGetUserById(userId);

  const modalRef = useRef(null);

  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState(VISIBILITY.PUBLIC);
  const [images, setImages] = useState([]);

  const { mutate: createPost, isPending } = useCreatePost();

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();

    setContent("");
    setImages([]);
    setVisibility(VISIBILITY.PUBLIC);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      // thu hồi object URL để tránh memory leak
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", visibility);
    images.forEach((img) => {
      formData.append("images", img.file);
    });

    createPost(formData, {
      onSuccess: () => {
        closeModal();
      },
      onError: (error) => {
        console.error("Craete post fail:", error);
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error.message);
  }

  const testStr = `${user.fullName}, what are you thinking about?`;

  return (
    <div className="w-full rounded-2xl shadow-sm border p-4">
      {/* OPEN MODAL */}
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={user.profilePic} />
          </div>
        </div>

        <button
          onClick={openModal}
          className="
          flex-1
          bg-gray-100
          hover:bg-gray-200
          rounded-full
          px-4 py-3
          text-left
          text-gray-500
          "
        >
          What do you think?
        </button>
      </div>

      <div className="divider my-2" />

      <div className="grid grid-cols-3">
        <button
          onClick={openModal}
          className="flex gap-2 justify-center py-2 hover:bg-gray-100 rounded-lg"
        >
          <Image className="text-green-500" />
          Image/Video
        </button>

        <button
          onClick={openModal}
          className="flex gap-2 justify-center py-2 hover:bg-gray-100 rounded-lg"
        >
          <Smile className="text-yellow-500" />
          Emotion
        </button>

        <button
          onClick={openModal}
          className="flex gap-2 justify-center py-2 hover:bg-gray-100 rounded-lg"
        >
          <Share2 />
          Share
        </button>
      </div>

      {/* MODAL */}

      <dialog ref={modalRef} className="modal">
        {isPending && <Loading />}
        <div className="modal-box p-0 rounded-xl">
          {/* HEADER */}

          <div
            className="
          flex
          justify-center
          items-center
          border-b
          p-4
          relative
          "
          >
            <h2 className="font-bold text-lg">Create Post</h2>
            <button
              onClick={closeModal}
              className="
              absolute right-4
              bg-gray-200
              rounded-full
              p-2
              "
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            {/* USER */}

            <div className="flex gap-3 mb-4">
              <img className="w-10 h-10 rounded-full" src={user.profilePic} />

              <div>
                <p className="font-semibold">{user.fullName}</p>

                {/* VISIBILITY */}

                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="
                  text-sm
                  bg-gray-100
                  rounded-md
                  px-2
                  py-1
                  "
                >
                  <option value={VISIBILITY.PUBLIC}>🌍 Public</option>

                  <option value={VISIBILITY.FRIENDS}>👥 Friend</option>

                  <option value={VISIBILITY.PRIVATE}>🔒 Private</option>
                </select>
              </div>
            </div>

            {/* CONTENT */}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={testStr}
              className="
              textarea
              textarea-ghost
              w-full
              min-h-[140px]
              resize-none
              text-lg
              "
            />

            {/* IMAGE PREVIEW */}

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url}
                      className="
                          rounded-lg
                          w-full
                          h-40
                          object-cover
                          "
                    />

                    <button
                      onClick={() => removeImage(index)}
                      className="
                          absolute
                          top-1 right-1
                          bg-black/50
                          text-white
                          rounded-full
                          p-1
                          "
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ACTION BAR */}

            <div
              className="
              border
              rounded-lg
              p-3
              mt-4
              flex
              items-center
              justify-between
              "
            >
              <span className="font-semibold">Add to your post</span>
              <label className="cursor-pointer">
                <Image className="text-green-500" />

                <input
                  hidden
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* SUBMIT */}

            <button
              disabled={!content.trim()}
              onClick={handleSubmit}
              className="
              btn
              w-full
              mt-4
              bg-blue-600
              text-white
              disabled:bg-gray-300
              "
            >
              Đăng
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      </dialog>
    </div>
  );
};

export default CreatePost;
