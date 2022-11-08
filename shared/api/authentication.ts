import { api } from "@shared/api";
import { AxiosError } from "axios";
import { LoginFormState, LoginSuccess, RegistrationFormState, RegistrationSuccess } from "@shared/interface";

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
