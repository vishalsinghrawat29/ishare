import { useContext, useEffect, useState } from "react";
import "./PostOptionModalStyle.css";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { PostModal } from "../PostModal/PostModal";
import { deletePost } from "../../Utils/PostUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { PostInBookmarks } from "../../Utils/PostInBookmarks";
import {
  followUser,
  removeBookmark,
  unfollowUser,
} from "../../Utils/UserUtils";

const PostOptionModal = ({ post, handleShowOptions }) => {
  const { _id, username } = post;
  const {
    authState: { user, token },
  } = useContext(AuthContext);
  const {
    dataState: { users, bookmarks },
    dataDispatch,
  } = useContext(DataContext);

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const userToFollow = users.find((user) => user?.username === username);

  const userAlreadyFollowing = userToFollow?.followers.find(
    (follower) => follower.username === user.username
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Follwing", userAlreadyFollowing);
  }, [users, userAlreadyFollowing]);

  return (
    <div className="post-option-container">
      {username === user?.username ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNewPostModal(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              pathname ? navigate(`${pathname}`) : navigate(`/home`);
              if (PostInBookmarks(bookmarks, _id))
                removeBookmark({ _id, token, dataDispatch });
              deletePost({ _id, token, dataDispatch });
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              userAlreadyFollowing
                ? unfollowUser({
                    followUserId: userToFollow._id,
                    token,
                    dataDispatch,
                    users,
                  })
                : followUser({
                    followUserId: userToFollow._id,
                    token,
                    dataDispatch,
                    users,
                  });
              handleShowOptions(post?._id);
            }}
          >
            {userAlreadyFollowing ? "UnFollow" : "Follow"}
          </button>
        </>
      )}
      {showNewPostModal ? (
        <div
          className="new-post-model-box"
          onClick={(e) => {
            e.stopPropagation();
            setShowNewPostModal(false);
            post && handleShowOptions(post?._id);
          }}
        >
          <PostModal
            post={post}
            handleShowOptions={handleShowOptions}
            setShowNewPostModal={setShowNewPostModal}
          />
        </div>
      ) : null}
    </div>
  );
};
export { PostOptionModal };
