const getAllUsersService = async () => {
  try {
    const res = await fetch("/api/users");
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateProfileService = async ({ editInput, token }) => {
  try {
    const res = await fetch("/api/users/edit", {
      method: "POST",
      body: JSON.stringify({ userData: editInput }),
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getBookmarkService = async (token) => {
  try {
    const res = await fetch("/api/users/bookmark/", {
      method: "GET",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const addBookmarkService = async ({ _id, token }) => {
  try {
    const res = await fetch(`/api/users/bookmark/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const removeBookmarkService = async ({ _id, token }) => {
  try {
    const res = await fetch(`/api/users/remove-bookmark/${_id}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const followUserService = async ({ followUserId, token }) => {
  try {
    const res = await fetch(`/api/users/follow/${followUserId}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const unfollowUserService = async ({ followUserId, token }) => {
  try {
    const res = await fetch(`/api/users/unfollow/${followUserId}`, {
      method: "POST",
      headers: { authorization: token },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllUsersService,
  updateProfileService,
  getBookmarkService,
  addBookmarkService,
  removeBookmarkService,
  followUserService,
  unfollowUserService,
};
