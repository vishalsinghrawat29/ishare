import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../index";
import { NavLink } from "react-router-dom";
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

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "1rem auto",
        backgroundColor: "antiquewhite",
      }}
    >
      <h1 style={{ padding: "1rem 0" }}>Login Page</h1>
      <form
        onSubmit={(e) => loginHandler(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
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
        <div>
          <button type="submit">Login</button>
          <button onClick={guestLoginHandler}>Guest Login</button>
        </div>
      </form>
      <div>
        <p>Don't have an account? </p> <NavLink to="/signup">SignUp</NavLink>{" "}
      </div>
    </div>
  );
};
export { Login };
