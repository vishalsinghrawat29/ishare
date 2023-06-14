import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./PostCardStyle.css";
import { GetPostDate } from "../../Utils/GetPostDate";
import { BsThreeDots } from "react-icons/bs";
import {
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
import { PostInBookmarks } from "../../Utils/PostInBookmarks";
import { addBookmark, removeBookmark } from "../../Utils/UserUtils";
import { sharePost } from "../../Utils/SharePost";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, showOptions, handleShowOptions }) => {
  const { _id } = post;
  const {
    authState: { user, token },
  } = useContext(AuthContext);

  const {
    dataState: { users, bookmarks },
    dataDispatch,
  } = useContext(DataContext);

  const currentUser = users?.find(
    ({ username }) => username === post?.username
  );
  const currentUserFullName = `${currentUser?.firstName} ${currentUser?.lastName}`;
  const postDate = GetPostDate(post?.createdAt);

  const isShowOption = showOptions === post._id;

  const navigate = useNavigate();

  return (
    <div
      className="post-card-container"
      id="post-card-container"
      onClick={() => navigate(`/post/${_id}`)}
    >
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
              onClick={(e) => {
                LikeByLoggedUser(post, user)
                  ? dislikePost({ _id, token, dataDispatch })
                  : likePost({ _id, token, dataDispatch });
                e.stopPropagation();
              }}
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

          <div className="post-card-btn-box">
            <button
              className="post-card-btn"
              onClick={(e) => {
                PostInBookmarks(bookmarks, _id)
                  ? removeBookmark({ _id, token, dataDispatch })
                  : addBookmark({ _id, token, dataDispatch });
                e.stopPropagation();
              }}
            >
              {PostInBookmarks(bookmarks, _id) ? (
                <MdBookmark className="post-card-btn-icon" />
              ) : (
                <MdBookmarkBorder className="post-card-btn-icon" />
              )}
            </button>
          </div>

          <button
            className="post-card-btn"
            onClick={(e) => {
              sharePost(_id);
              e.stopPropagation();
            }}
          >
            <MdShare className="post-card-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export { PostCard };
