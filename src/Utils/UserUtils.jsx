import {
  addBookmarkService,
  getBookmarkService,
  removeBookmarkService,
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
export { getBookmarks, addBookmark, removeBookmark };
