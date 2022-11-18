import { OptionsType } from "cookies-next/lib/types";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export const getAccessToken = (options?: OptionsType) => {
  const accessToken = getCookie("access-token", options);
  return accessToken ? (accessToken as string) : "";
};

export const getRefreshToken = (options?: OptionsType) => {
  const refreshToken = getCookie("refresh-token", options);
  return refreshToken ? (refreshToken as string) : "";
};

export const setSession = (accessToken: string, refreshToken: string, options?: OptionsType) => {
  setCookie("access-token", accessToken, options);
  setCookie("refresh-token", refreshToken, options);
};

export const destroySession = (options?: OptionsType) => {
  deleteCookie("access-token", options);
  deleteCookie("refresh-token", options);
};

export const isSessionActive = (options?: OptionsType) => {
  const active = hasCookie("access-token", options) || hasCookie("refresh-token", options);
  return active;
};
