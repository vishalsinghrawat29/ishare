const sharePost = (postId) => {
  navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
  alert("Link copied to clipboard");
};
export { sharePost };
