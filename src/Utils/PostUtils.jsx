import { createPostService, editPostService } from "../Services/PostServices";
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
    }
  } catch (err) {
    console.log(err);
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
    }
  } catch (err) {
    console.log(err);
  }
};

export { createPost, editPost };
