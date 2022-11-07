import { FetchHomePageDataSuccess } from "@shared/interface";
import api from "./api";

const SiteApi = {
  fetchHomePageData: async () => {
    const res = await api.get<FetchHomePageDataSuccess>("/site/home_page");
    return res.data;
  },
};

export default SiteApi;
