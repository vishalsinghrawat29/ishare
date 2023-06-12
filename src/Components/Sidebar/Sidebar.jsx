import { NavLink } from "react-router-dom";
import "./SidebarStyle.css";
import { useContext } from "react";
import { AuthContext } from "../../index";
const Sidebar = () => {
  const { authState, logoutUser } = useContext(AuthContext);

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

      <button>New Post</button>

      <button onClick={() => logoutUser()}>LogOut</button>
    </div>
  );
};
export { Sidebar };
