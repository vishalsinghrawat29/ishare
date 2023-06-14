import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./PostCardStyle.css";
import { GetPostDate } from "../../Utils/GetPostDate";
import { BsThreeDots, BsFillHeartFill } from "react-icons/bs";
import {
  MdMoreHoriz,
  MdFavorite,
  MdFavoriteBorder,
  MdBookmarkBorder,
  MdBookmark,
  MdShare,
} from "react-icons/md";
import { PostOptionModal } from "../PostOptionModal/PostOptionModal";
import { LikeByLoggedUser } from "../../Utils/LikeByLoggedUser";
import { AuthContext } from "../../index";
import { dislikePost, likePost } from "../../Utils/PostUtils";

const PostCard = ({ post, showOptions, handleShowOptions }) => {
  const { _id } = post;
  const {
    authState: { user, token },
  } = useContext(AuthContext);

  const {
    dataState: { users },
    dataDispatch,
  } = useContext(DataContext);

  const currentUser = users?.find(
    ({ username }) => username === post?.username
  );
  const currentUserFullName = `${currentUser?.firstName} ${currentUser?.lastName}`;
  const postDate = GetPostDate(post?.createdAt);

  const isShowOption = showOptions === post._id;

  return (
    <div className="post-card-container" id="post-card-container">
      <div className="post-card-profile">
        <UserAvatar user={currentUser} />
      </div>
      <div className="post-card-body">
        <div className="post-card-details">
          <p>{currentUserFullName}</p>
          <p>@{currentUser?.username}</p>
          <p>. {postDate}</p>
          <div className="post-card-option">
            <button
              onClick={(e) => {
                handleShowOptions(post?._id);
                e.stopPropagation();
              }}
            >
              <BsThreeDots />
            </button>
            {isShowOption ? (
              <PostOptionModal
                post={post}
                handleShowOptions={handleShowOptions}
              />
            ) : null}
          </div>
        </div>
        <p className="post-card-content">{post?.content}</p>
        {post?.image ? (
          <img
            className="post-card-image"
            src={post?.image}
            alt={post?.imageAlt}
          />
        ) : null}
        <div className="post-card-btn-container">
          <div className="post-card-btn-box">
            <button
              className="post-card-btn"
              onClick={() =>
                LikeByLoggedUser(post, user)
                  ? dislikePost({ _id, token, dataDispatch })
                  : likePost({ _id, token, dataDispatch })
              }
            >
              {LikeByLoggedUser(post, user) ? (
                <MdFavorite
                  className="post-card-btn-icon"
                  style={{ color: "red" }}
                />
              ) : (
                <MdFavoriteBorder className="post-card-btn-icon" />
              )}
            </button>

            {post?.likes?.likeCount > 0 && (
              <span>{post?.likes?.likeCount}</span>
            )}
          </div>

          <button className="post-card-btn">
            <MdBookmarkBorder className="post-card-btn-icon" />
          </button>
          <button className="post-card-btn">
            <MdShare className="post-card-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export { PostCard };
