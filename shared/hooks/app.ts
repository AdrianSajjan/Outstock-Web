import * as React from "react";
import { api, client } from "@shared/api";
import { AppContext } from "@shared/context";
import { AuthenticateSessionSuccess, LoginQueryState } from "@shared/interface";
import { deleteSession, getAccessToken, getRefreshToken, isSessionActive } from "@shared/utils";

export const useAppContext = () => {
  const app = React.useContext(AppContext);
  return app;
};

export const useAuthentication = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const sessionActive = isSessionActive();
        if (!sessionActive) return;
        const res = await api.get<AuthenticateSessionSuccess>("/auth/session");
        client.setQueryData(["auth"], {
          user: res.data.user,
          accessToken: getAccessToken(),
          refreshToken: getRefreshToken(),
          isAuthenticated: true,
        });
      } catch (error) {
        client.invalidateQueries({ queryKey: ["auth"] });
        deleteSession();
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  return isLoadingComplete;
};

export const useSession = () => {
  const initialState: LoginQueryState = { accessToken: null, isAuthenticated: false, refreshToken: null, user: null };
  const session = client.getQueryData<LoginQueryState>(["auth"]) || initialState;
  return { ...session };
};
