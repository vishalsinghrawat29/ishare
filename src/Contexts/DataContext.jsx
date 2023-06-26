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
    setLoader,
  } = useContext(AuthContext);
  const initialDataState = {
    users: [],
    posts: [],
    bookmarks: [],
    activeFilter: "Latest",
  };
  const [dataState, dataDispatch] = useReducer(DataReducer, initialDataState);
  const [isPostsLoading, setPostsLoading] = useState(true);
  const [isUsersLoading, setUsersLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const res = await getAllUsersService();
      const jsonRes = await res.json();
      if (res.status === 200) {
        dataDispatch({ type: "setUsers", payload: jsonRes?.users });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUsersLoading(false);
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
    setLoader(true);
    getAllUsers();
    getAllPosts();
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [setLoader]);

  useEffect(() => {
    getBookmarks(token, dataDispatch);
  }, [token]);

  return (
    <DataContext.Provider
      value={{ dataState, dataDispatch, isPostsLoading, isUsersLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};
