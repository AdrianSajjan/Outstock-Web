import { perRequestProductLimit } from "@shared/constants";
import { AxiosErrorResponse, FetchProductsSuccess, FetchProductState, FetchProductSuccess, SearchProductsSuccess } from "@shared/interface";
import api from "./api";

type FetchProductsProps = Omit<FetchProductsSuccess, "nextPage">;

export const fetchProducts = async (query: FetchProductState): Promise<FetchProductsSuccess> => {
  try {
    const res = await api.get<FetchProductsProps>("/product", { params: { ...query, limit: perRequestProductLimit } });
    return { ...res.data, nextPage: query.page + 1 };
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const fetchProductBySlug = async (slug: string): Promise<FetchProductSuccess> => {
  try {
    const res = await api.get<FetchProductSuccess>(`/product/${slug}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const searchProducts = async (key: string): Promise<SearchProductsSuccess> => {
  try {
    const res = await api.get<SearchProductsSuccess>(`/product/search`, { params: { key } });
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
