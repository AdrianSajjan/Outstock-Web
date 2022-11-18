import { AxiosError } from "axios";
import { perRequestProductLimit } from "@shared/constants";
import { ErrorResponse, FetchProductsSuccess, FetchProductState, FetchProductSuccess } from "@shared/interface";
import api from "./api";

type FetchProductsProps = Omit<FetchProductsSuccess, "nextPage">;

export const fetchProducts = async (query: FetchProductState): Promise<FetchProductsSuccess> => {
  try {
    const res = await api.get<FetchProductsProps>("/product", { params: { ...query, limit: perRequestProductLimit } });
    return { ...res.data, nextPage: query.page + 1 };
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const fetchProductBySlug = async (slug: string): Promise<FetchProductSuccess> => {
  try {
    const res = await api.get<FetchProductSuccess>(`/product/${slug}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};
