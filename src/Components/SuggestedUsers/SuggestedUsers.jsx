import { useContext } from "react";
import "./SuggestedUsersStyle.css";
import { AuthContext, DataContext } from "../../index";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { followUser } from "../../Utils/UserUtils";

const SuggestedUsers = () => {
  const {
    authState: { user, token },
  } = useContext(AuthContext);

  const {
    dataState: { users },
    dataDispatch,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const userData = users?.find((dbUser) => dbUser?.username === user?.username);

  const suggestedUsersList = users
    ?.filter((dbUser) => dbUser?.username !== userData?.username)
    .filter(
      (userToCheck) =>
        !userData?.following.find(
          (followedUser) => followedUser.username === userToCheck.username
        )
    );

  return (
    <div className="suggested-user-container">
      {suggestedUsersList.length ? (
        <div className="suggested-user-profile-box">
          <h1>Suggested Users</h1>
          {suggestedUsersList.map((user) => (
            <div
              className="suggested-user-profile"
              key={user?._id}
              onClick={() => {
                navigate(`/profile/${user?.username}`);
              }}
            >
              <UserAvatar user={user} />
              <div className="suggested-user-info">
                <span>{`${user?.firstName} ${user?.lastName}`}</span>
                <span>@{user?.username}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  followUser({
                    followUserId: user?._id,
                    token,
                    dataDispatch,
                    users,
                  });
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export { SuggestedUsers };
