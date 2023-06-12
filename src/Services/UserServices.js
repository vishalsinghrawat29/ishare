const getAllUsersService = async () => {
  try {
    const res = await fetch("/api/users");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsersService };
