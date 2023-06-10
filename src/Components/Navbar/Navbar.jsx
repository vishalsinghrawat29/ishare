import { NavLink } from "react-router-dom";
import "./NavbarStyle.css";
import { useContext } from "react";
import { AuthContext } from "../../index";
const Navbar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Welcome
      </NavLink>

      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Home
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Login
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Signup
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Explore
      </NavLink>

      <NavLink
        to="/bookmarks"
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        Bookmarks
      </NavLink>

      <NavLink
        to={`/profile/${authState?.user?.username}`}
        className={({ isActive }) => (isActive ? "activeNavStyle" : "navStyle")}
      >
        User Profile
      </NavLink>
    </nav>
  );
};

export { Navbar };
