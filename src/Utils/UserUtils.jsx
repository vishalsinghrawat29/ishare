import { toast } from "react-toastify";
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
      toast.success("Post bookmarked.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Failed to bookmark post. Please try again.");
  }
};
const removeBookmark = async ({ _id, token, dataDispatch }) => {
  try {
    const res = await removeBookmarkService({ _id, token });
    const jsonRes = await res.json();
    if (res.status === 200) {
      dataDispatch({ type: "setBookmarks", payload: jsonRes?.bookmarks });
      toast.success("Post removed from bookmarks!");
    }
  } catch (err) {
    console.log(err);
    toast.error("Failed to remove post from bookmarks. Please try again.");
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
      toast.success(`Started following ${jsonRes?.followUser?.firstName}`);
    }
  } catch (err) {
    console.log(err);
    toast.error("An error occurred. Please try again.");
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
      toast.success(`Unfollow ${jsonRes?.followUser?.firstName}`);
    }
  } catch (err) {
    console.log(err);
    toast.error("An error occurred. Please try again.");
  }
};

const updateProfile = async ({
  editInput,
  token,
  authDispatch,
  dataDispatch,
  users,
  setProfileBtnDisabled,
  toastId,
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
      toast.update(toastId, {
        render: "Profile Updated.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    }
  } catch (err) {
    console.log(err);
    toast.update(toastId, {
      render: "Profile Update failed.",
      type: "success",
      isLoading: false,
      autoClose: 500,
    });
  } finally {
    setProfileBtnDisabled(false);
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
