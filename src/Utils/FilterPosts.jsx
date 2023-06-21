const FilterPosts = (posts, filterBy) => {
  if (filterBy === "Oldest") {
    return [...posts]?.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  if (filterBy === "Latest") {
    return [...posts]?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (filterBy === "Trending") {
    return [...posts]?.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  }

  return posts;
};
export { FilterPosts };
