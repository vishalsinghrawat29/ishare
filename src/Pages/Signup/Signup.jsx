import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../index";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useContext(AuthContext);

  const [SignupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePwd, setHidePwd] = useState({ pwd: true, confirmPwd: true });
  const [pwdMatch, setPwdMatch] = useState(true);

  const signupHandler = (e) => {
    e.preventDefault();
    signupUser(SignupData);
  };

  useEffect(() => {
    if (SignupData?.password !== "" && confirmPassword !== "") {
      setPwdMatch(SignupData?.password === confirmPassword);
    }
  }, [SignupData?.password, confirmPassword]);

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "1rem auto",
        backgroundColor: "antiquewhite",
      }}
    >
      <h1 style={{ padding: "1rem 0" }}>Signup Page</h1>
      <form onSubmit={(e) => signupHandler(e)}>
        <div>
          <label htmlFor="firstName">
            First Name<span>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={SignupData?.firstName}
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name<span>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={SignupData?.lastName}
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="username">
            Username<span>*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={SignupData?.username}
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Password<span>*</span>
          </label>
          <input
            type={hidePwd?.pwd ? "password" : "text"}
            id="password"
            name="password"
            value={SignupData?.password}
            onChange={(e) =>
              setSignupData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <span
            onClick={() =>
              setHidePwd((prev) => ({
                ...prev,
                pwd: !hidePwd?.pwd,
              }))
            }
          >
            {hidePwd?.pwd ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password<span>*</span>
          </label>
          <input
            type={hidePwd?.confirmPwd ? "password" : "text"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <span
            onClick={() =>
              setHidePwd((prev) => ({
                ...prev,
                confirmPwd: !hidePwd?.confirmPwd,
              }))
            }
          >
            {hidePwd?.confirmPwd ? <FaEye /> : <FaEyeSlash />}
          </span>
          {!pwdMatch ? <div>Password Do Not Match</div> : ""}
        </div>
        <div>
          <button type="submit" disabled={!pwdMatch}>
            Signup
          </button>
        </div>
      </form>
      <div>
        <p>Already have an account? </p> <NavLink to="/login">Login</NavLink>{" "}
      </div>
    </div>
  );
};
export { Signup };
