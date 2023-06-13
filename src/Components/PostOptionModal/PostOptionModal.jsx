import { useContext, useState } from "react";
import "./PostOptionModalStyle.css";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { PostModal } from "../PostModal/PostModal";
import { deletePost } from "../../Utils/PostUtils";
import { useLocation, useNavigate } from "react-router-dom";

const PostOptionModal = ({ post, handleShowOptions }) => {
  const { _id, username } = post;
  const {
    authState: { user, token },
  } = useContext(AuthContext);
  const {
    dataState: { users },
    dataDispatch,
  } = useContext(DataContext);

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const userToFollow = users.find((user) => user?.username === username);

  const userAlreadyFollowing = userToFollow.followers.find(
    (follower) => follower.username === user.username
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();

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
              if (pathname !== "/") navigate("/");
              deletePost({ _id, token, dataDispatch });
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <button>{userAlreadyFollowing ? "UnFollow" : "Follow"}</button>
        </>
      )}
      {showNewPostModal ? (
        <div className="new-post-model-box">
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
