import { AxiosErrorResponse, FetchHomePageDataSuccess } from "@shared/interface";
import { AxiosError } from "axios";
import api from "./api";

export const fetchHomePageData = async () => {
  try {
    const res = await api.get<FetchHomePageDataSuccess>("/site/home_page");
    return res.data.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
