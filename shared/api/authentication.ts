import { api } from "@shared/api";
import { AxiosErrorResponse, LoginFormState, LoginSuccess, LogoutSuccess, RegistrationFormState, RegistrationSuccess } from "@shared/interface";
import { getRefreshToken } from "@shared/utils";

export const login = async (values: LoginFormState): Promise<LoginSuccess> => {
  try {
    const res = await api.post("/user/auth/login", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const register = async (values: Omit<RegistrationFormState, "confirmPassword">): Promise<RegistrationSuccess> => {
  try {
    const res = await api.post("/user/auth/register", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const logout = async (): Promise<LogoutSuccess> => {
  try {
    const refreshToken = getRefreshToken();
    const res = await api.post("/user/auth/logout", { refreshToken });
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
