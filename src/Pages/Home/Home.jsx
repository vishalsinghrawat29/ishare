import { useContext, useEffect, useState } from "react";
import { NewPost } from "../../Components/NewPost/NewPost";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./HomeStyle.css";
import { AuthContext, DataContext } from "../../index";
import { PostCard } from "../../Components/PostCard/PostCard";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { FilterBar } from "../../Components/FilterBar/FilterBar";
import { FilterPosts } from "../../Utils/FilterPosts";
const Home = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    dataState: { users, posts, activeFilter },
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

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );

  const followingUsers = loggedInUser?.following;

  const postOfFollowingUsers = posts?.filter(
    (post) =>
      followingUsers?.some(
        (followingUser) => followingUser.username === post.username
      ) || user.username === post.username
  );

  const FilteredPosts = FilterPosts(postOfFollowingUsers, activeFilter);

  return (
    <div className="home-page-container">
      <div className="sidebar-box">
        <Sidebar />
      </div>
      <div className="body-box">
        <h1>Home</h1>
        <FilterBar />
        <div>
          <NewPost />
        </div>
        <div className="post-cards-box">
          {isPostsLoading ? (
            <p>Loading...</p>
          ) : FilteredPosts?.length ? (
            FilteredPosts.map((post) => (
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
export { Home };
