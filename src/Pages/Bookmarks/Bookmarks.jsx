import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { PostCard } from "../../Components/PostCard/PostCard";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { FilterPosts } from "../../Utils/FilterPosts";

const Bookmarks = () => {
  const {
    dataState: { posts, bookmarks },
    isPostsLoading,
  } = useContext(DataContext);

  const [showOptions, setShowOptions] = useState(null);

  const handleShowOptions = (postId) => {
    setShowOptions((prev) => (prev === postId ? null : postId));
  };

  const handleClickOutside = () => {
    setShowOptions(null);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const bookmarkedPosts = posts.filter((dbPost) =>
    bookmarks.find((bookmark) => bookmark === dbPost._id)
  );

  const latestBookmarks = FilterPosts(bookmarkedPosts, "Latest");

  return (
    <div className="home-page-container">
      <div className="sidebar-box">
        <Sidebar />
      </div>
      <div className="body-box">
        <h1>Bookmarks</h1>

        <div className="post-cards-box">
          {isPostsLoading ? (
            <p>Loading...</p>
          ) : latestBookmarks?.length ? (
            latestBookmarks.map((post) => (
              <PostCard
                post={post}
                key={post._id}
                showOptions={showOptions}
                handleShowOptions={handleShowOptions}
              />
            ))
          ) : (
            <p>No Bookmarks</p>
          )}
        </div>
      </div>
      <div className="profile-box">
        <SuggestedUsers />
      </div>
    </div>
  );
};
export { Bookmarks };
