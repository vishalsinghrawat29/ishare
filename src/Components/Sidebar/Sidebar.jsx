import { NavLink } from "react-router-dom";
import "./SidebarStyle.css";
import { useContext, useState } from "react";
import { AuthContext, DataContext } from "../../index";
import { PostModal } from "../PostModal/PostModal";
import { FaHome, FaHashtag, FaRegBookmark, FaPlus } from "react-icons/fa";
import { UserAvatar } from "../UserAvatar/UserAvatar";

const Sidebar = () => {
  const { authState } = useContext(AuthContext);
  const {
    dataState: { users },
  } = useContext(DataContext);

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const currentUser = users.find(
    (dbUser) => dbUser?.username === authState?.user.username
  );

  return (
    <div className="sidebar">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button className="center">
          <FaHome className="icon" />
          <span>Home</span>
        </button>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button className="center">
          <FaHashtag className="icon" />
          <span>Explore</span>
        </button>
      </NavLink>

      <NavLink
        to="/bookmarks"
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button className="center">
          <FaRegBookmark className="icon" />
          <span>Bookmarks</span>
        </button>
      </NavLink>

      <button
        className="center nav-new-post-btn"
        onClick={() => setShowNewPostModal(true)}
      >
        <FaPlus className="icon" />
        <span>New Post</span>
      </button>

      {/* <button className="center nav-btn" onClick={() => logoutUser()}>
        LogOut
      </button> */}

      <NavLink
        to={`/profile/${currentUser?.username}`}
        className={({ isActive }) => (isActive ? "activeNav" : "nav")}
      >
        <button className="center nav-profile-btn">
          <UserAvatar user={currentUser} />
          <span>
            <p>
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p>@{currentUser?.username}</p>
          </span>
        </button>
      </NavLink>

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
