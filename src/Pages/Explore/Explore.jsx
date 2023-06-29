import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { PostCard } from "../../Components/PostCard/PostCard";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { FilterPosts } from "../../Utils/FilterPosts";
import { FilterBar } from "../../Components/FilterBar/FilterBar";

const Explore = () => {
  const {
    dataState: { posts, activeFilter },
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
  const latestPosts = FilterPosts(posts, activeFilter);

  return (
    <div className="home-page-container">
      <div className="sidebar-box">
        <Sidebar />
      </div>
      <div className="body-box">
        <h1>Explore</h1>
        <FilterBar />
        <div className="post-cards-box">
          {isPostsLoading ? (
            <p>Loading...</p>
          ) : latestPosts?.length ? (
            latestPosts.map((post) => (
              <PostCard
                post={post}
                key={post._id}
                showOptions={showOptions}
                handleShowOptions={handleShowOptions}
              />
            ))
          ) : (
            <p className="empty-posts">No Posts 😔</p>
          )}
        </div>
      </div>
      <div className="profile-box">
        <SuggestedUsers />
      </div>
    </div>
  );
};
export { Explore };
