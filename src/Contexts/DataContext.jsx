import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataReducer } from "../Reducer/DataReducer";
import { getAllUsersService } from "../Services/UserServices";
import { getAllPostsService } from "../Services/PostServices";
import { AuthContext } from "./AuthContext";
import { getBookmarks } from "../Utils/UserUtils";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const {
    authState: { token },
  } = useContext(AuthContext);
  const initialDataState = {
    users: [],
    posts: [],
    bookmarks: [],
  };
  const [dataState, dataDispatch] = useReducer(DataReducer, initialDataState);
  const [isPostsLoading, setPostsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const res = await getAllUsersService();
      const jsonRes = await res.json();
      if (res.status === 200) {
        dataDispatch({ type: "setUsers", payload: jsonRes?.users });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await getAllPostsService();
      const jsonRes = await res.json();
      if (res.status === 200) {
        dataDispatch({ type: "setPosts", payload: jsonRes?.posts });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPosts();
  }, []);

  useEffect(() => {
    getBookmarks(token, dataDispatch);
  }, [token]);

  return (
    <DataContext.Provider value={{ dataState, dataDispatch, isPostsLoading }}>
      {children}
    </DataContext.Provider>
  );
};
