import { createContext, useReducer, useState } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";
import { loginService, signupService } from "../Services/AuthServices";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuthState = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
  };

  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const loginUser = async (loginInput, setLoginBtnDisabled) => {
    setLoginBtnDisabled(true);
    try {
      const res = await loginService(loginInput);
      const jsonRes = await res?.json();
      if (res?.status === 200) {
        localStorage.setItem("user", JSON.stringify(jsonRes?.foundUser));
        localStorage.setItem("token", JSON.stringify(jsonRes?.encodedToken));
        authDispatch({ type: "setUser", payload: jsonRes?.foundUser });
        authDispatch({ type: "setToken", payload: jsonRes?.encodedToken });
        toast.success("Login Successfully!");
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      } else {
        console.log(jsonRes?.errors[0]);
        toast.error(jsonRes?.errors[0]);
      }
    } catch (err) {
      logoutUser();
      console.log(err);
      toast.error("Please enter valid input!");
    } finally {
      setLoginBtnDisabled(false);
    }
  };

  const signupUser = async (signupInput, setSignupBtnDisabled) => {
    setSignupBtnDisabled(true);
    try {
      const res = await signupService(signupInput);
      const jsonRes = await res.json();
      if (res.status === 201) {
        authDispatch({ type: "setUser", payload: jsonRes?.createdUser });
        authDispatch({ type: "setToken", payload: jsonRes?.encodedToken });
        toast.success("Signup Successfully!");
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      } else {
        console.log(jsonRes?.errors[0]);
        toast.error(jsonRes.errors[0]);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setSignupBtnDisabled(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authDispatch({ type: "setUser", payload: {} });
    authDispatch({ type: "setToken", payload: "" });
    toast.success("You're logged out!");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        loginUser,
        signupUser,
        logoutUser,
        loader,
        setLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
