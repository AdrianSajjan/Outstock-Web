export const getAccessToken = () => {
  let accessToken: string | null = null;
  if (typeof window !== "undefined") accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getRefreshToken = () => {
  let refreshToken: string | null = null;
  if (typeof window !== "undefined") refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
};

export const setSession = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const deleteSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const isSessionActive = () => {
  let active = false;
  if (typeof window !== "undefined") {
    active = !!localStorage.getItem("accessToken") || !!localStorage.getItem("refreshToken");
  }
  return active;
};
