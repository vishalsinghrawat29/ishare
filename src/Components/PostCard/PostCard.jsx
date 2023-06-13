import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./PostCardStyle.css";
import { GetPostDate } from "../../Utils/GetPostDate";
import { BsThreeDots } from "react-icons/bs";
import { PostOptionModal } from "../PostOptionModal/PostOptionModal";

const PostCard = ({ post, showOptions, handleShowOptions }) => {
  const {
    dataState: { users },
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
      </div>
    </div>
  );
};
export { PostCard };
