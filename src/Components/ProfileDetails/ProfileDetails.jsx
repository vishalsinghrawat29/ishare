import { useContext, useState } from "react";
import "./ProfileDetailsStyle.css";
import { AuthContext, DataContext } from "../../index";
import { UserAvatar } from "../UserAvatar/UserAvatar";

const ProfileDetails = ({ currentUser }) => {
  const {
    authState: { user, token },
  } = useContext(AuthContext);
  const {
    dataState: { users },
    dataDispatch,
    isUsersLoading,
  } = useContext(DataContext);

  const [editModal, setEditModal] = useState(false);
  const [followModal, setFollowModal] = useState({
    show: false,
    title: "",
    list: [],
  });
  console.log(currentUser);

  const loggedInUser = users.find(({ username }) => username === user.username);
  const { username, followers } = currentUser;
  console.log(username, followers);

  const userAlreadyFollowing = currentUser?.followers?.find(
    (follower) => follower.username === currentUser.username
  );
  console.log(userAlreadyFollowing);

  return (
    <div className="profile-container">
      {isUsersLoading ? <p>Loading...</p> : <UserAvatar user={currentUser} />}
      <div>
        <p>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
        <p>@{currentUser?.username}</p>
      </div>
    </div>
  );
};
export { ProfileDetails };
