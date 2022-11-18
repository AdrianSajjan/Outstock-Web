import axios from "axios";
import { destroySession, getAccessToken, getRefreshToken, setSession } from "@shared/utils";
import { OAuth2Success } from "@shared/interface";
import { apiStore, useSessionStore } from "@shared/store";
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

    if (error.response.status !== 401 || original._retry) return Promise.reject(error);

    if (original.url === "/user/auth/oauth2") {
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

    if (!apiStore.getState().isAuthRefreshing) {
      apiStore.setState((state) => ({ ...state, isAuthRefreshing: true }));

      original._retry = true;
      const refreshToken = getRefreshToken();

      const res = await api.post<OAuth2Success>("/user/auth/oauth2", { refreshToken });

      setSession(res.data.accessToken, res.data.refreshToken);
      useSessionStore.getState().updateSessionTokens(res.data);

      if (apiStore.getState().pendingRequests.length > 0) {
        console.log("Retrying pending requests");
        apiStore.getState().pendingRequests.map((request) => console.log(request));
        Promise.allSettled(apiStore.getState().pendingRequests);
      }

      apiStore.setState({ isAuthRefreshing: false, pendingRequests: [] });

      const isFormData = original.data instanceof FormData;

      return api({
        ...original,
        headers: {
          ...original.headers,
          "Content-Type": isFormData ? "multipart/formdata" : "application/json",
        },
      });
    } else {
      console.log(`Pending request for path: ${error.response.config.url}`);
      const isFormData = original.data instanceof FormData;
      apiStore.setState((state) => ({
        ...state,
        pendingRequests: [
          ...state.pendingRequests,
          api({
            ...original,
            headers: {
              ...original.headers,
              "Content-Type": isFormData ? "multipart/formdata" : "application/json",
            },
          }),
        ],
      }));
      Promise.reject("Request will be parsed after auth is refreshed");
    }
  }
);

export default api;
