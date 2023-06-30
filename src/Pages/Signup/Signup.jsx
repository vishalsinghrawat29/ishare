import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../index";
import { useNavigate } from "react-router-dom";
import loginImg from "../../Assets/iShareSignup.png";

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

  const [signupBtnDisabled, setSignupBtnDisabled] = useState(false);

  const signupHandler = (e) => {
    e.preventDefault();
    signupUser(SignupData, setSignupBtnDisabled);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (SignupData?.password !== "" && confirmPassword !== "") {
      setPwdMatch(SignupData?.password === confirmPassword);
    }
  }, [SignupData?.password, confirmPassword]);

  return (
    <div className="login">
      <div className="login-img">
        <img src={loginImg} alt="ishare-login" />
      </div>
      <div className="login-container">
        <h1>Signup</h1>
        <form onSubmit={(e) => signupHandler(e)} className="login-form">
          <div className="login-field">
            <label htmlFor="firstName">
              First Name<span>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={SignupData?.firstName}
              onChange={(e) =>
                setSignupData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="login-field">
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
          <div className="login-field">
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
          <div className="login-field">
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
          <div className="login-field">
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
            {!pwdMatch ? (
              <div className="err-message">Password Do Not Match</div>
            ) : (
              ""
            )}
          </div>
          <div className="login-btn">
            <button type="submit" disabled={!pwdMatch || signupBtnDisabled}>
              Signup
            </button>
          </div>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export { Signup };
