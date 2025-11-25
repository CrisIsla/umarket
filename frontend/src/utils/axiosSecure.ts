import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosSecure = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}

axiosSecure.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const csrf = getCookie("csrf");
  if (csrf) {
    const existing = config.headers as Record<string, string> | undefined;
    const merged: Record<string, string> = existing ? { ...existing } : {};
    merged["X-CSRF-Token"] = csrf;
    config.headers = merged as unknown as InternalAxiosRequestConfig["headers"];
  }
  return config;
});

export default axiosSecure;