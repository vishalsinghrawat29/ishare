import {
  addBookmarkService,
  followUserService,
  getBookmarkService,
  removeBookmarkService,
  unfollowUserService,
  updateProfileService,
} from "../Services/UserServices";

const getBookmarks = async (token, dataDispatch) => {
  try {
    const res = await getBookmarkService(token);
    const jsonRes = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: jsonRes?.bookmarks });
    }
  } catch (err) {
    console.log(err);
  }
};

const addBookmark = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await addBookmarkService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: jsonRes?.bookmarks });
    }
  } catch (err) {
    console.log(err);
  }
};
const removeBookmark = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await removeBookmarkService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: jsonRes?.bookmarks });
    }
  } catch (err) {
    console.log(err);
  }
};

const followUser = async ({ followUserId, token, dataDispatch, users }) => {
  try {
    const res = await followUserService({ followUserId, token });
    const jsonRes = await res.json();
    if (res.status === 200) {
      const newUsers = users.map((user) => {
        if (user?.username === jsonRes?.user?.username) {
          return jsonRes?.user;
        } else if (user?.username === jsonRes?.followUser?.username) {
          return jsonRes?.followUser;
        }
        return user;
      });
      dataDispatch({ type: "setUsers", payload: newUsers });
    }
  } catch (err) {
    console.log(err);
  }
};

const unfollowUser = async ({ followUserId, token, dataDispatch, users }) => {
  try {
    const res = await unfollowUserService({ followUserId, token });
    const jsonRes = await res.json();
    if (res.status === 200) {
      const newUsers = users.map((user) => {
        if (user?.username === jsonRes?.user?.username) {
          return jsonRes?.user;
        } else if (user?.username === jsonRes?.followUser?.username) {
          return jsonRes?.followUser;
        }
        return user;
      });
      dataDispatch({ type: "setUsers", payload: newUsers });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async ({
  editInput,
  token,
  authDispatch,
  dataDispatch,
  users,
}) => {
  console.log(editInput);
  try {
    const res = await updateProfileService({ editInput, token });
    const jsonRes = await res.json();
    if (res.status === 201) {
      localStorage.setItem("user", JSON.stringify(jsonRes?.user));
      authDispatch({ type: "setUser", payload: jsonRes?.user });
      const newUsers = users.map((user) => {
        if (user?.username === jsonRes?.user?.username) {
          return jsonRes?.user;
        }
        return user;
      });
      dataDispatch({ type: "setUsers", payload: newUsers });
    }
  } catch (err) {
    console.log(err);
  }
};

export {
  getBookmarks,
  addBookmark,
  removeBookmark,
  followUser,
  unfollowUser,
  updateProfile,
};
