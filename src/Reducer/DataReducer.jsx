const DataReducer = (state, action) => {
  switch (action.type) {
    case "setUsers":
      return { ...state, users: action.payload };
    case "setPosts":
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};
export { DataReducer };
