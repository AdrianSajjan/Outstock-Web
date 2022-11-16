import { perRequestProductLimit } from "@shared/constants";
import { FetchProductsSuccess, FetchProductState, FetchProductSuccess } from "@shared/interface";
import api from "./api";

export const fetchProducts = async (query: FetchProductState): Promise<FetchProductsSuccess> => {
  const res = await api.get<Omit<FetchProductsSuccess, "nextPage">>("/product", { params: { ...query, limit: perRequestProductLimit } });
  return { ...res.data, nextPage: query.page + 1 };
};

export const fetchProductBySlug = async (slug: string): Promise<FetchProductSuccess> => {
  const res = await api.get<FetchProductSuccess>(`/product/${slug}`);
  return res.data;
};
