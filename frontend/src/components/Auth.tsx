import { ReactNode } from "react";
import { useAuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

const Auth = ({ children }: { children: JSX.Element | ReactNode}) => {
  const { user } = useAuthContext();
  if (user === undefined) {
    return <p>NOW LOADING</p>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Auth;
