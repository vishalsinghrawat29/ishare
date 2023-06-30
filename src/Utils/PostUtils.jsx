import { toast } from "react-toastify";
import {
  createPostService,
  deletePostService,
  dislikePostService,
  editPostService,
  likePostService,
} from "../Services/PostServices";
const createPost = async ({
  input,
  image,
  imageAlt,
  token,
  user,
  dataDispatch,
}) => {
  try {
    const res = await createPostService({
      input,
      image,
      imageAlt,
      token,
      user,
    });
    const jsonRes = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
      toast.success("Added Post.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Post failed, please try again.");
  }
};

const editPost = async ({
  token,
  image,
  imageAlt,
  post,
  input,
  dataDispatch,
}) => {
  try {
    const res = await editPostService({ token, image, imageAlt, post, input });
    const jsonRes = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
      toast.success("Update Post.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Update post failed.");
  }
};

const deletePost = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await deletePostService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
      toast.success("Delete Post.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Update post failed.");
  }
};

const likePost = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await likePostService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
    }
  } catch (err) {
    console.log(err);
  }
};

const dislikePost = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await dislikePostService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 201) {
      dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
    }
  } catch (err) {
    console.log(err);
  }
};

export { createPost, editPost, deletePost, likePost, dislikePost };
