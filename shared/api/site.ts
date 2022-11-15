import { FetchHomePageDataSuccess } from "@shared/interface";
import api from "./api";

export const fetchHomePageData = async () => {
  const res = await api.get<FetchHomePageDataSuccess>("/site/home_page");
  return res.data.data;
};
