import { ReactNode, createContext, useContext, useEffect } from "react";
import UseAuth from "./hooks/UseAuth";
import { userType } from "./types";

type AuthContextType = {
  user: userType | null | undefined;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const initialState: AuthContextType = {
  user: null,
  login: async (data) => {
    console.warn("login function not implemented yet", data);
  },
  signup: async (data) => {
    console.warn("signup function not implemented yet", data);
  },
  logout: () => {
    console.warn("signup function not implemented yet");
  },
};

const AuthContext = createContext<AuthContextType>(initialState);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, signup, getUser, logout } = UseAuth();
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
