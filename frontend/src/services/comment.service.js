import instance from "../libs/axios"

export const deleteComment = async (commentId) => {
    const res = await instance.delete(`/comments/${commentId}`);
    return res.data;
}