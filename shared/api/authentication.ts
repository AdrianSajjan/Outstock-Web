import { api } from "@shared/api";
import { AxiosError } from "axios";
import { getRefreshToken } from "@shared/utils";
import { ErrorResponse, LoginFormState, LoginSuccess, LogoutSuccess, RegistrationFormState, RegistrationSuccess } from "@shared/interface";

export const login = async (values: LoginFormState): Promise<LoginSuccess> => {
  try {
    const res = await api.post("/user/auth/login", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const register = async (values: Omit<RegistrationFormState, "confirmPassword">): Promise<RegistrationSuccess> => {
  try {
    const res = await api.post("/user/auth/register", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const logout = async (): Promise<LogoutSuccess> => {
  try {
    const refreshToken = getRefreshToken();
    const res = await api.post("/user/auth/logout", { refreshToken });
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};
