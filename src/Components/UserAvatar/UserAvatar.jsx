import "./UserAvatarStyle.css";
const UserAvatar = ({ user }) => {
  const avatar = user?.profileAvatar;
  const userInitial = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(
    0
  )}`;
  return (
    <span className="user-avatar-container">
      {avatar ? (
        <img src={avatar} alt={user?.username} />
      ) : (
        <span>{userInitial.toUpperCase()}</span>
      )}
    </span>
  );
};
export { UserAvatar };
