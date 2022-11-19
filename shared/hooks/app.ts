import * as React from "react";
import { api } from "@shared/api";
import { useSessionStore } from "@shared/store/Session";
import { AuthenticateSessionSuccess } from "@shared/interface";
import { destroySession, getAccessToken, getRefreshToken, isSessionActive } from "@shared/utils";
import { useRouter } from "next/router";
import { isBrowser } from "framer-motion";

export const useAuthentication = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const { initializeSession, setupInitialization } = useSessionStore();

  React.useEffect(() => {
    (async () => {
      try {
        const sessionActive = isSessionActive();
        if (!sessionActive) {
          setupInitialization(false);
          return;
        }
        const res = await api.get<AuthenticateSessionSuccess>("/user/auth");
        initializeSession({ user: res.data, accessToken: getAccessToken(), refreshToken: getRefreshToken() });
      } catch (error) {
        destroySession();
        setupInitialization(false);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  return isLoadingComplete;
};

export const useAuthenticationStore = () => {
  const router = useRouter();
  const session = useSessionStore();

  React.useEffect(() => {
    if (session.isLoading || !isBrowser) return;
    if (!session.isAuthenticated) router.push("/");
  }, [session.isAuthenticated, session.isLoading]);

  return session;
};
