import { ReactNode, createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { userType } from "../types";

type AuthContextType = {
  user: userType | null;
  isFetching: boolean;
  error: boolean;
  dispatch?: React.Dispatch<any>;
};

//初期のユーザー状態
const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

//状態をグローバルに管理
export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
