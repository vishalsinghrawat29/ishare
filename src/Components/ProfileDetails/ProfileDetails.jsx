import { useContext, useState } from "react";
import "./ProfileDetailsStyle.css";
import { AuthContext, DataContext } from "../../index";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { FollowListModal } from "../FollowListModal/FollowListModal";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import { followUser, unfollowUser } from "../../Utils/UserUtils";
import { UserBackground } from "../UserBackground/UserBackground";
import { FaRegEdit } from "react-icons/fa";
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
    (follower) => follower.username === loggedInUser.username
  );
  console.log(userAlreadyFollowing);
  console.log(currentUser, user);

  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="profile-avtaar">
          <div>
            <UserBackground user={currentUser} />
          </div>
          <div className="profile-img">
            {isUsersLoading ? (
              <p>Loading...</p>
            ) : (
              <UserAvatar user={currentUser} />
            )}
            <div className="profile-btn-container">
              {currentUser?.id === user?.id ? (
                <button
                  className="center profile-btn"
                  onClick={() => setEditModal(true)}
                >
                  <FaRegEdit className="icon" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    userAlreadyFollowing
                      ? unfollowUser({
                          followUserId: currentUser._id,
                          token,
                          dataDispatch,
                          users,
                        })
                      : followUser({
                          followUserId: currentUser._id,
                          token,
                          dataDispatch,
                          users,
                        });
                  }}
                >
                  {userAlreadyFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div>
          <p className="profile-name">{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
          <p className="profile-username">@{currentUser?.username}</p>
        </div>
        <p className="profile-bio">{currentUser?.bio}</p>
        <a href={currentUser?.website} className="profile-website">
          {currentUser?.website}
        </a>
        <div className="profile-follow-container">
          <div
            className="profile-follow"
            onClick={() => {
              setFollowModal(() => ({
                show: true,
                title: "Following",
                list: currentUser?.following,
              }));
            }}
          >
            <span>{currentUser?.following?.length}</span>
            <span>Following</span>
          </div>
          <div
            className="profile-follow"
            onClick={() => {
              setFollowModal(() => ({
                show: true,
                title: "Followers",
                list: currentUser?.followers,
              }));
            }}
          >
            <span>{currentUser?.followers?.length}</span>
            <span>Followers</span>
          </div>
        </div>
      </div>
      {editModal ? (
        <div
          className="edit-modal-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            setEditModal(false);
          }}
        >
          <EditProfileModal setEditModal={setEditModal} />
        </div>
      ) : null}
      {followModal.show ? (
        <div
          className="follow-list-modal-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            setFollowModal(false);
          }}
        >
          <FollowListModal
            followModal={followModal}
            setFollowModal={setFollowModal}
          />
        </div>
      ) : null}
    </div>
  );
};
export { ProfileDetails };
