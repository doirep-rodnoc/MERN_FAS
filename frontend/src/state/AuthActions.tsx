import { userType } from "../types";

export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: userType) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error: any) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
