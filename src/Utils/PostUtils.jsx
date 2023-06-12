import { createPostService } from "../Services/PostServices";
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

export { createPost };
