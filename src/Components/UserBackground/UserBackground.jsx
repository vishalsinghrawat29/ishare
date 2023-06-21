import "./UserBackgroundStyle.css";
const UserBackground = ({ user }) => {
  const background = user?.profileBackground;

  return (
    <>
      <span className="user-background-container">
        {background ? (
          <img src={background} alt={user?.username} />
        ) : (
          <span className="default-background"></span>
        )}
      </span>
    </>
  );
};
export { UserBackground };
