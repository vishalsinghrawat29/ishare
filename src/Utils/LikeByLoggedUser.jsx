const LikeByLoggedUser = (post, user) => {
  return post?.likes.likedBy.find(
    (likeUser) => likeUser.username === user.username
  );
};
export { LikeByLoggedUser };
