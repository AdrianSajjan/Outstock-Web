import { deleteCookie, getCookie, hasCookie, setCookie, setCookies } from "cookies-next";

export const getAccessToken = () => {
  const accessToken = getCookie("accessToken");
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = getCookie("refreshToken");
  return refreshToken;
};

export const setSession = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

export const deleteSession = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};

export const isSessionActive = () => {
  const active = hasCookie("accessToken") || hasCookie("refreshToken");
  return active;
};
