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
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

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
            className="center"
            onClick={(e) => {
              e.stopPropagation();
              setShowNewPostModal(true);
            }}
          >
            <FaRegEdit className="icon" />
            Edit
          </button>
          <button
            className="center"
            onClick={(e) => {
              e.stopPropagation();
              pathname ? navigate(`${pathname}`) : navigate(`/home`);
              if (PostInBookmarks(bookmarks, _id))
                removeBookmark({ _id, token, dataDispatch });
              deletePost({ _id, token, dataDispatch });
            }}
          >
            <FaRegTrashAlt className="icon" />
            Delete
          </button>
        </>
      ) : (
        <>
          <button
            className="center"
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
            {userAlreadyFollowing ? (
              <>
                <RiUserUnfollowLine className="icon" />
                UnFollow
              </>
            ) : (
              <>
                <RiUserFollowLine className="icon" /> Follow
              </>
            )}
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
