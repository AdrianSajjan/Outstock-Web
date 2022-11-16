import * as React from "react";
import { api } from "@shared/api";
import { useSessionStore } from "@shared/store/Session";
import { AuthenticateSessionSuccess } from "@shared/interface";
import { destroySession, getAccessToken, getRefreshToken, isSessionActive } from "@shared/utils";

export const useAuthentication = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const { initializeSession } = useSessionStore();

  React.useEffect(() => {
    (async () => {
      try {
        const sessionActive = isSessionActive();
        if (!sessionActive) return;
        const res = await api.get<AuthenticateSessionSuccess>("/user/auth");
        initializeSession({ user: res.data, accessToken: getAccessToken(), refreshToken: getRefreshToken() });
      } catch (error) {
        destroySession();
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  return isLoadingComplete;
};
