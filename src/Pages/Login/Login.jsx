import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../index";
import { useNavigate } from "react-router-dom";
import loginImg from "../../Assets/iShareLogin.png";
import "./LoginStyle.css";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [hidePwd, setHidePwd] = useState(true);

  const guestLoginUser = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };
  const guestLoginHandler = (e) => {
    e.preventDefault();
    setLoginData(guestLoginUser);
    loginUser(guestLoginUser);
  };

  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login-img">
        <img src={loginImg} alt="ishare-login" />
      </div>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={(e) => loginHandler(e)} className="login-form">
          <div className="login-field">
            <label htmlFor="userName">
              Username <span>*</span>
            </label>
            <input
              type="text"
              id="userName"
              value={loginData?.username}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type={hidePwd ? "password" : "text"}
              id="password"
              value={loginData?.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <span onClick={() => setHidePwd(!hidePwd)}>
              {hidePwd ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="login-btn">
            <button type="submit">Login</button>
            <button onClick={guestLoginHandler}>Guest Login</button>
          </div>
        </form>
        <div className="login-link">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>SignUp</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export { Login };
