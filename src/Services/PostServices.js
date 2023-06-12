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

export { getAllPostsService, createPostService };
