import { api } from "@shared/api";
import { useSessionStore } from "@shared/store";
import { OptionsType } from "cookies-next/lib/types";
import { AuthenticateSessionSuccess } from "@shared/interface";
import { destroySession, getAccessToken, getRefreshToken, isSessionActive } from "./storage";

export const authenticateUser = async (options?: OptionsType) => {
  try {
    const sessionActive = isSessionActive(options);
    console.log(sessionActive);
    console.log(getAccessToken(options));
    if (!sessionActive) return;
    const res = await api.get<AuthenticateSessionSuccess>("/user/auth");
    useSessionStore.getState().initializeSession({ user: res.data, accessToken: getAccessToken(options), refreshToken: getRefreshToken(options) });
  } catch (error) {
    destroySession(options);
  }
};
