import { createContext, useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";
import { loginService, signupService } from "../Services/AuthServices";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuthState = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
  };

  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);

  const location = useLocation();
  const navigate = useNavigate();

  const loginUser = async (loginInput) => {
    try {
      const res = await loginService(loginInput);
      const jsonRes = await res?.json();
      if (res?.status === 200) {
        localStorage.setItem("user", JSON.stringify(jsonRes?.foundUser));
        localStorage.setItem("token", JSON.stringify(jsonRes?.encodedToken));
        authDispatch({ type: "setUser", payload: jsonRes?.foundUser });
        authDispatch({ type: "setToken", payload: jsonRes?.encodedToken });
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      } else {
        console.log(jsonRes?.errors[0]);
      }
    } catch (err) {
      logoutUser();
      console.log(err);
    }
  };

  const signupUser = async (signupInput) => {
    try {
      const res = await signupService(signupInput);
      const jsonRes = await res.json();
      if (res.status === 201) {
        authDispatch({ type: "setUser", payload: jsonRes?.createdUser });
        authDispatch({ type: "setToken", payload: jsonRes?.encodedToken });
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      } else {
        console.log(jsonRes?.errors[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authDispatch({ type: "setUser", payload: {} });
    authDispatch({ type: "setToken", payload: "" });
    console.log("you are logout");
  };

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, loginUser, signupUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
