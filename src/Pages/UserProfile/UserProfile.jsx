import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../../Components/PostCard/PostCard";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { ProfileDetails } from "../../Components/ProfileDetails/ProfileDetails";
import { MdKeyboardBackspace } from "react-icons/md";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { SearchBar } from "../../Components/SearchBar/SearchBar";

const UserProfile = () => {
  const { username } = useParams();
  const {
    dataState: { users, posts },
    isPostsLoading,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const currentUser = users.find((user) => user.username === username);

  const currentUserPosts = posts?.filter((post) => post.username === username);

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
        <div>
          <button onClick={() => navigate(-1)}>
            <MdKeyboardBackspace />
          </button>
          <span>
            <h1>{currentUser?.username}</h1>
            <p>{currentUserPosts?.length} posts</p>
          </span>
        </div>

        {currentUser ? <ProfileDetails currentUser={currentUser} /> : null}
        {isPostsLoading ? (
          <p>Loading...</p>
        ) : !currentUser ? (
          <p>User Not Found</p>
        ) : currentUserPosts?.length ? (
          [...currentUserPosts]
            ?.reverse()
            .map((post) => (
              <PostCard
                post={post}
                key={post._id}
                showOptions={showOptions}
                handleShowOptions={handleShowOptions}
              />
            ))
        ) : (
          <p>No posts to show.</p>
        )}
      </div>
      <div className="profile-box">
        <SearchBar />
        <SuggestedUsers />
      </div>
    </div>
  );
};
export { UserProfile };
