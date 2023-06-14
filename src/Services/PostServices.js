const getAllPostsService = async () => {
  try {
    const res = await fetch("/api/posts");
    return res;
  } catch (err) {
    console.log(err);
  }
};

const createPostService = async ({ input, image, imageAlt, token, user }) => {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        postData: { content: input, image, imageAlt, username: user },
      }),
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const editPostService = async ({ token, image, imageAlt, post, input }) => {
  try {
    const res = await fetch(`/api/posts/edit/${post._id}`, {
      method: "POST",
      body: JSON.stringify({
        postData: { content: input, image, imageAlt },
      }),
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const deletePostService = async ({ _id, token }) => {
  try {
    const res = await fetch(`/api/posts/${_id}`, {
      method: "DELETE",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const likePostService = async ({ _id, token }) => {
  try {
    const res = await fetch(`/api/posts/like/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const dislikePostService = async ({ _id, token }) => {
  try {
    const res = await fetch(`/api/posts/dislike/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllPostsService,
  createPostService,
  editPostService,
  deletePostService,
  likePostService,
  dislikePostService,
};
