import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  (config) => {
    const token = "";
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

    if (original.url === "/auth/oauth2") {
      return Promise.reject(error);
    }

    original._retry = true;
    const refreshToken = "";
    const res = await api.post("/auth/oauth2", { refreshToken });
    return api(original);
  }
);

export default api;
