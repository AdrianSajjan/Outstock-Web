import { api } from "@shared/api";
import { AxiosError } from "axios";
import { LoginFormState, LoginSuccess, LogoutState, LogoutSuccess, RegistrationFormState, RegistrationSuccess } from "@shared/interface";
import { getRefreshToken } from "@shared/utils";

export const login = async (values: LoginFormState): Promise<LoginSuccess> => {
  try {
    const res = await api.post("/user/auth/login", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<any>;
    console.log(error.response?.data);
    throw error.response ? error.response.data.message : error.message;
  }
};

export const register = async (values: Omit<RegistrationFormState, "confirmPassword">): Promise<RegistrationSuccess> => {
  try {
    const res = await api.post("/user/auth/register", values);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<any>;
    console.log(error.response?.data);
    throw error.response ? error.response.data.message : error.message;
  }
};

export const logout = async (): Promise<LogoutSuccess> => {
  try {
    const refreshToken = getRefreshToken();
    const res = await api.post("/user/auth/logout", { refreshToken });
    return res.data;
  } catch (e) {
    const error = e as AxiosError<any>;
    console.log(error.response?.data);
    throw error.response ? error.response.data.message : error.message;
  }
};
