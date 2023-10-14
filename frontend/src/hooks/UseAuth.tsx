import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userType } from "../types";

const UseAuth = () => {
  const [user, setUser] = useState<null | undefined | userType>();
  const navigate = useNavigate();

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post("/api/auth/register", data);
      await getUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      await axios.post("/api/auth/login", data);
      await getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    axios.delete("/api/auth/logout", { withCredentials: true });
    navigate("/login");
  };

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/user", { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }, []);

  return { user, signup, login, getUser, logout };
};

export default UseAuth;
