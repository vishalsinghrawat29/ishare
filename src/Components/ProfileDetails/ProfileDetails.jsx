import "./ProfileDetailsStyle.css";

const ProfileDetails = ({ currentUser }) => {
  console.log(currentUser?.username);
  // const {
  //   authState: { user, token },
  // } = useContext(AuthContext);
  // const {
  //   dataState: { users },
  //   dataDispatch,
  //   isUsersLoading,
  // } = useContext(DataContext);

  // const [editModal, setEditModal] = useState(false);
  // const [followModal, setFollowModal] = useState({
  //   show: false,
  //   title: "",
  //   list: [],
  // });

  // const loggedInUser = users.find(({ username }) => username === user.username);
  // const { username, followers } = currentUser;
  // console.log(username, followers);

  //   const userAlreadyFollowing = followers?.find(
  //     (follower) => follower.username === currentUser.username
  //   );
  //   console.log(userAlreadyFollowing);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
export { ProfileDetails };
