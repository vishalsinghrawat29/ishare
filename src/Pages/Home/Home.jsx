import { useContext, useEffect, useState } from "react";
import { NewPost } from "../../Components/NewPost/NewPost";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./HomeStyle.css";
import { DataContext } from "../../index";
import { PostCard } from "../../Components/PostCard/PostCard";
const Home = () => {
  const {
    dataState: { posts },
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

  return (
    <div className="home-page-container">
      <div className="sidebar-box">
        <Sidebar />
      </div>
      <div className="body-box">
        <h1>Home</h1>
        <div>
          <NewPost />
        </div>
        <div className="post-cards-box">
          {isPostsLoading ? (
            <p>Loading...</p>
          ) : posts?.length ? (
            posts.map((post) => (
              <PostCard
                post={post}
                key={post._id}
                showOptions={showOptions}
                handleShowOptions={handleShowOptions}
              />
            ))
          ) : (
            <p>No Posts</p>
          )}
        </div>
      </div>
      <div className="profile-box"></div>
    </div>
  );
};
export { Home };
