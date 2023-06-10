import { useContext } from "react";
import { AuthContext } from "../index";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return authState?.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export { PrivateRoute };
