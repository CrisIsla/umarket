import {
  checkingCredentials,
  login as loginAction,
  logout as logoutAction,
} from "./authSlice";
import * as authService from "../../services/loginService";
import type { AppThunk } from "@/store/store";

export const checkingAuthentication = (): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const result = await authService.restoreLogin();
      if (result && result.success && result.data) {
        const user = result.data;
        dispatch(
          loginAction({ uid: user.id, email: user.email, displayName: user.name })
        );
      } else {
        dispatch(logoutAction({}));
      }
    } catch (error) {
      dispatch(logoutAction({}));
    }
  };
};

export const startLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const data = await authService.login({ email, password });
      dispatch(loginAction({ uid: data.id, email: data.email, displayName: data.name }));
    } catch (err: unknown) {
      const getErrorMessage = (e: unknown): string => {
        if (!e) return "Login failed";
        if (typeof e === "string") return e;
        if (e instanceof Error) return e.message;
        const maybe = e as { response?: { data?: { message?: string } } };
        return maybe?.response?.data?.message ?? "Login failed";
      };
      dispatch(logoutAction({ errorMessage: getErrorMessage(err) }));
    }
  };
};

export const startLogout = (): AppThunk => {
  return async (dispatch) => {
    try {
      await authService.logout();
    } catch {
    }
    dispatch(logoutAction({}));
  };
};
