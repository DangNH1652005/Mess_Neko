import cloudinary from "../configs/cloudinary.config.js";

export const uploadImage = (buffer, folder = "posts") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url, publicId: result.public_id });
        },
      )
      .end(buffer);
  });
};

export const getImage = (publicId, options = {}) => {
  const { width, height, crop = "fill", quality = "auto" } = options;

  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "image",
    transformation: [
      {
        ...(width && { width }),
        ...(height && { height }),
        crop,
        quality,
        fetch_format: "auto",
      },
    ],
  });
};

export const deleteImage = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  return result.result === "ok";
};
