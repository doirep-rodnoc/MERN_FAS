import { ReactNode } from "react";
import { useAuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../pages/login/Login";

const Auth = ({ children }: { children: JSX.Element | ReactNode}) => {
  const { user } = useAuthContext();
  if (user === undefined) {
    return <p>LOADING</p>;
  }

  if (!user) {
    return <Login/>;
  }
  return children;
};

export default Auth;
