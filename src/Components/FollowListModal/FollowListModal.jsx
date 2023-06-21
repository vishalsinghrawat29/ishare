import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import "./FollowListModalStyle.css";
import { UserAvatar } from "../UserAvatar/UserAvatar";
const FollowListModal = ({ followModal, setFollowModal }) => {
  const { title, list } = followModal;

  const navigate = useNavigate();
  return (
    <div className="follow-list-modal">
      <div className="follow-list-modal-head">
        <h1>{title}</h1>
        <button onClick={() => setFollowModal(false)}>
          <MdClose />
        </button>
      </div>
      <div className="follow-list">
        {list.length ? (
          list.map((item) => (
            <div
              className="follow-list-card"
              key={item?._id}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${item.username}`);
                setFollowModal(false);
              }}
            >
              <UserAvatar user={item} />
              <div className="follow-list-names">
                <span>{`${item?.firstName} ${item?.lastName}`}</span>
                <span>{item?.username}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Oops! No {title} found</p>
        )}
      </div>
    </div>
  );
};
export { FollowListModal };
