import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../../Components/PostCard/PostCard";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { ProfileDetails } from "../../Components/ProfileDetails/ProfileDetails";
import { MdKeyboardBackspace } from "react-icons/md";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import "./UserProfileStyle.css";

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
        <div className="profile-nav">
          <button className="center" onClick={() => navigate(-1)}>
            <MdKeyboardBackspace className="icon" />
          </button>
          <span>
            <h1>
              {currentUser?.firstName} {currentUser?.lastName}
            </h1>
            <p>{currentUserPosts?.length} posts</p>
          </span>
        </div>

        <div className="post-cards-box">
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
            <p className="empty-posts">No posts to show 😔</p>
          )}
        </div>
      </div>
      <div className="profile-box">
        <SuggestedUsers />
      </div>
    </div>
  );
};
export { UserProfile };
