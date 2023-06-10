import { useContext } from "react";
import { AuthContext } from "../../index";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <h1>UserProfile Page</h1>
      <p>{username}</p>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};
export { UserProfile };
