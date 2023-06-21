import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../../index";
import { BiSlider } from "react-icons/bi";

const FilterBar = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const {
    dataState: { activeFilter },
    dataDispatch,
  } = useContext(DataContext);

  return (
    <div>
      <p>{activeFilter} posts</p>
      <div>
        <button onClick={() => setShowFilterModal((prev) => !prev)}>
          <BiSlider />
        </button>
        {showFilterModal ? (
          <div>
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Trending" });
                setShowFilterModal(false);
              }}
            >
              Trending
            </button>
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Latest" });
                setShowFilterModal(false);
              }}
            >
              Latest
            </button>
            <button
              onClick={() => {
                dataDispatch({ type: "setActiveFilter", payload: "Oldest" });
                setShowFilterModal(false);
              }}
            >
              Oldest
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export { FilterBar };
