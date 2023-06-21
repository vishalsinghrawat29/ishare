import { useState } from "react";
import { Debounce } from "../../Utils/Debounce";
import "./SearchBarStyle.css";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { GetSearchedUsers } from "../../Utils/GetSearchedUsers";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
const SearchBar = () => {
  const [searchVal, setSearchVal] = useState("");

  const {
    dataState: { users },
  } = useContext(DataContext);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchVal !== "") {
      return setSearchResult(GetSearchedUsers(users, searchVal));
    }
    return setSearchResult([]);
  }, [searchVal, users]);

  const navigate = useNavigate();

  return (
    <div className="search-bar-container">
      <div className="search-bar-input">
        <input
          type="text"
          placeholder="search users..."
          onChange={Debounce((e) => setSearchVal(e.target.value), 400)}
        />
        <MdSearch className="search-bar-icon" />
      </div>

      {searchVal.length ? (
        <div className="searched-users-container">
          <div className="searched-users-profile">
            {searchResult?.length ? (
              searchResult?.map((user) => (
                <div
                  key={user._id}
                  className="searched-user-profile"
                  onClick={() => {
                    navigate(`/profile/${user.username}`);
                    setSearchVal("");
                  }}
                >
                  <UserAvatar user={user} />

                  <div className="searched-user-info">
                    <span>{`${user?.firstName} ${user?.lastName}`}</span>
                    <span>@{user?.username}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-search">No such user found</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export { SearchBar };
