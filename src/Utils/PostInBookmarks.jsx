const PostInBookmarks = (bookmarks, postId) => {
  return bookmarks.find((bookmark) => bookmark === postId);
};
export { PostInBookmarks };
