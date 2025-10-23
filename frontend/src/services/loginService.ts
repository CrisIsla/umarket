import axios from "axios";
import axiosSecure from "../utils/axiosSecure";

type Credentials = {
    email: string;
    password: string;
};

type RegisterCredentials = { 
    username: string;
    password: string;
    contact: { 
        email: string; 
    }
};

export const login = async (credentials: Credentials) => {
    const response = await axios.post("api/auth/login", credentials);
    const csrfToken = response.headers["x-csrf-token"];

    if (csrfToken) {
        localStorage.setItem("csrfToken", csrfToken);
    }

    return response.data;
};


export const register = async (credentials: RegisterCredentials) => {
  const response = await axios.post("api/auth/register", credentials);
  const csrfToken = response.headers["x-csrf-token"];

  if (csrfToken) {
    localStorage.setItem("csrfToken", csrfToken);
  }

  return response.data;
}

export const restoreLogin = async () => {
    try {
        const response = await axiosSecure.get("/api/auth/me");
        return { data: response.data, success: true };
    } catch {
        return null;
    }
};

export const logout = async () => {
    await axiosSecure.post("/api/auth/logout");
    localStorage.removeItem("csrfToken");
};