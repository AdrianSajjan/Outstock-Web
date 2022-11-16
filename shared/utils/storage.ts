import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export const getAccessToken = () => {
  const accessToken = getCookie("access-token");
  return accessToken ? accessToken.toString() : "";
};

export const getRefreshToken = () => {
  const refreshToken = getCookie("refresh-token");
  return refreshToken ? refreshToken.toString() : "";
};

export const setSession = (accessToken: string, refreshToken: string) => {
  deleteCookie("access-token");
  deleteCookie("refresh-token");
  setCookie("access-token", accessToken);
  setCookie("refresh-token", refreshToken);
};

export const destroySession = () => {
  deleteCookie("access-token");
  deleteCookie("refresh-token");
};

export const isSessionActive = () => {
  const active = hasCookie("access-token") || hasCookie("refresh-token");
  return active;
};
