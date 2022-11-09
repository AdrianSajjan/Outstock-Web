import axios from "axios";
import { getAccessToken, getRefreshToken, setSession } from "@shared/utils";
import { OAuth2Success } from "@shared/interface";
import { useSessionStore } from "@shared/store/Session";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

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
      return Promise.reject(error);
    }

    original._retry = true;
    const refreshToken = getRefreshToken();
    const res = await api.post<OAuth2Success>("/user/auth/oauth2", { refreshToken });

    setSession(res.data.accessToken, res.data.refreshToken);
    useSessionStore.setState((state) => ({ ...state, ...res.data }));

    return api(original);
  }
);

export default api;
