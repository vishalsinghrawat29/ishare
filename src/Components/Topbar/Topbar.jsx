import logo from "../../Assets/iShareLogo.png";
import { SearchBar } from "../SearchBar/SearchBar";

import "./TopbarStyle.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={logo} alt="iShare" />
        <span>iShare</span>
      </div>
      <div className="search">
        <SearchBar />
      </div>
    </div>
  );
};

export { TopBar };
