import { FetchProductsSuccess, FetchProductState, FetchProductSuccess } from "@shared/interface";
import api from "./api";

export const fetchProducts = async (query: Partial<FetchProductState>): Promise<FetchProductsSuccess> => {
  const res = await api.get<FetchProductsSuccess>("/product", { params: query });
  return res.data;
};

export const fetchProductBySlug = async (slug: string): Promise<FetchProductSuccess> => {
  const res = await api.get<FetchProductSuccess>(`/product/${slug}`);
  return res.data;
};
