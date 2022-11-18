import axios from "axios";
import { destroySession, getAccessToken, getRefreshToken, setSession } from "@shared/utils";
import { OAuth2Success } from "@shared/interface";
import { useSessionStore } from "@shared/store";
import { createStandaloneToast } from "@chakra-ui/react";

const api = axios.create({
  baseURL: "http://192.168.0.107:5000/",
});

const toast = createStandaloneToast();

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers!["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    throw error;
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) return Promise.reject(error);
    const original = error.config;

    if (original.url === "/user/auth/oauth2" || original._retry) {
      destroySession();
      useSessionStore.getState().reauthenticateSession();
      toast({
        title: "Authentication Error",
        description: `${error.response.data.message || error.message}. Kindly login again.`,
        variant: "left-accent",
        position: "top",
        isClosable: true,
      });
      return Promise.reject(error);
    }

    if (error.response.status !== 401) return Promise.reject(error);

    original._retry = true;
    const refreshToken = getRefreshToken();
    const res = await api.post<OAuth2Success>("/user/auth/oauth2", { refreshToken });
    setSession(res.data.accessToken, res.data.refreshToken);
    useSessionStore.getState().updateSessionTokens(res.data);
    return api({
      ...original,
      headers: {
        ...original.headers,
        "Content-Type": "application/json",
      },
    });
  }
);

export default api;
