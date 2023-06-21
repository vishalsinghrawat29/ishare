const GetSearchedUsers = (users, searchString) => {
  return users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchString.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchString.toLowerCase())
  );
};
export { GetSearchedUsers };
