import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Welcome } from "../Pages/Welcome/Welcome";
import { Explore } from "../Pages/Explore/Explore";
import { Home } from "../Pages/Home/Home";
import { Bookmarks } from "../Pages/Bookmarks/Bookmarks";
import { SinglePost } from "../Pages/SinglePost/SinglePost";
import { UserProfile } from "../Pages/UserProfile/UserProfile";
import { Login } from "../Pages/Login/Login";
import { Signup } from "../Pages/Signup/Signup";
import { ResetScroll } from "../Components/ResetScroll/ResetScroll";
import { PageNotFound } from "../Pages/PageNotFound/PageNotFound";
import { useContext } from "react";
import { AuthContext } from "../index";

const AppRoutes = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  const navigatePath = location?.state?.from?.pathname
    ? location?.state?.from?.pathname
    : "/home";

  return (
    <div>
      <ResetScroll>
        <Routes>
          <Route
            path="/"
            element={
              authState?.token ? <Navigate to={navigatePath} /> : <Welcome />
            }
          />
          <Route
            path="/login"
            element={
              authState?.token ? <Navigate to={navigatePath} /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              authState?.token ? <Navigate to={navigatePath} /> : <Signup />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <Explore />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <PrivateRoute>
                <SinglePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ResetScroll>
    </div>
  );
};

export { AppRoutes };
