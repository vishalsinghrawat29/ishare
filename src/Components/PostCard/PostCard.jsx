import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./PostCardStyle.css";
import { GetPostDate } from "../../Utils/GetPostDate";

const PostCard = ({ post }) => {
  const {
    dataState: { users },
  } = useContext(DataContext);

  const currentUser = users?.find(
    ({ username }) => username === post?.username
  );
  const currentUserFullName = `${currentUser?.firstName} ${currentUser?.lastName}`;
  const postDate = GetPostDate(post?.createdAt);
  return (
    <div className="post-card-container">
      <div className="post-card-profile">
        <UserAvatar user={currentUser} />
      </div>
      <div className="post-card-body">
        <div className="post-card-details">
          <p>{currentUserFullName}</p>
          <p>@{currentUser?.username}</p>
          <p>. {postDate}</p>
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
