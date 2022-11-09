import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export const getAccessToken = () => {
  const accessToken = getCookie("accessToken");
  return accessToken ? accessToken.toString() : "";
};

export const getRefreshToken = () => {
  const refreshToken = getCookie("refreshToken");
  return refreshToken ? refreshToken.toString() : "";
};

export const setSession = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

export const destroySession = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};

export const isSessionActive = () => {
  const active = hasCookie("accessToken") || hasCookie("refreshToken");
  return active;
};
