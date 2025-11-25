import axiosSecure from "../utils/axiosSecure";

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  password: string;
  contact: {
    email: string;
  };
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export const login = async (credentials: Credentials): Promise<AuthUser> => {
  const response = await axiosSecure.post("/api/auth/login", credentials);
  return response.data as AuthUser;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthUser> => {
  const response = await axiosSecure.post("/api/auth/register", credentials);
  return response.data as AuthUser;
};

export const restoreLogin = async (): Promise<{
  data: AuthUser | null;
  success: boolean;
}> => {
  try {
    const response = await axiosSecure.get("/api/auth/me");
    return { data: response.data as AuthUser, success: true };
  } catch {
    return { data: null, success: false };
  }
};

export const logout = async () => {
  await axiosSecure.post("/api/auth/logout");
};