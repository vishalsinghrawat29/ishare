import { NavLink } from "react-router-dom";
import "./SidebarStyle.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../index";
import { PostModal } from "../PostModal/PostModal";
const Sidebar = () => {
  const { authState, logoutUser } = useContext(AuthContext);

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  return (
    <div className="sidebar-container">
      <h1>iShare</h1>

      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button>Home</button>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button>Explore</button>
      </NavLink>

      <NavLink
        to="/bookmarks"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button>Bookmarks</button>
      </NavLink>

      <NavLink
        to={`/profile/${authState?.user?.username}`}
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button>Profile</button>
      </NavLink>

      <button onClick={() => setShowNewPostModal(true)}>New Post</button>

      <button onClick={() => logoutUser()}>LogOut</button>

      {showNewPostModal ? (
        <div
          className="new-post-model-box"
          onClick={(e) => {
            e.stopPropagation();
            setShowNewPostModal(false);
          }}
        >
          <PostModal setShowNewPostModal={setShowNewPostModal} />
        </div>
      ) : null}
    </div>
  );
};
export { Sidebar };
