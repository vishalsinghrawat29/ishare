import { useContext, useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../../index";
import {
  BiSlider,
  BiTrendingUp,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";
import "./FilterBarStyle.css";
const FilterBar = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    dataState: { activeFilter },
    dataDispatch,
  } = useContext(DataContext);

  const handleClickOutside = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="filterbar">
      <p className="filterbar-name">{activeFilter} posts</p>
      <div className="filterbar-action" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => {
            setShowFilterModal((prev) => !prev);
            e.stopPropagation();
          }}
          className="center filterbar-btn"
        >
          <BiSlider className="icon" />
        </button>
        {showFilterModal ? (
          <div
            className="filterbar-option"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Trending" });
                setShowFilterModal(false);
              }}
              className={`center ${
                activeFilter === "Trending" ? "active-filter" : ""
              }`}
            >
              <BiTrendingUp className="icon" />
              Trending
            </button>
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Latest" });
                setShowFilterModal(false);
              }}
              className={`center ${
                activeFilter === "Latest" ? "active-filter" : ""
              }`}
            >
              <BiUpArrowAlt className="icon" />
              Latest
            </button>
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Oldest" });
                setShowFilterModal(false);
              }}
              className={`center ${
                activeFilter === "Oldest" ? "active-filter" : ""
              }`}
            >
              <BiDownArrowAlt className="icon" />
              Oldest
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export { FilterBar };
