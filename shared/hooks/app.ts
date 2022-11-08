import * as React from "react";
import { api } from "@shared/api";
import { AppContext } from "@shared/context";
import { AuthenticateSessionSuccess } from "@shared/interface";
import { deleteSession, isSessionActive } from "@shared/utils";

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
        const res = await api.get<AuthenticateSessionSuccess>("/user/auth");
      } catch (error) {
        deleteSession();
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);

  return isLoadingComplete;
};
