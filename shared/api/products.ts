import api from "./api";
import { FetchProductsSuccess, FetchProductSuccess } from "@shared/interface";

export const fetchProducts = async (query: any): Promise<FetchProductsSuccess> => {
  const res = await api.get<FetchProductsSuccess>("/product");
  return res.data;
};

export const fetchProductBySlug = async (slug: string): Promise<FetchProductSuccess> => {
  const res = await api.get<FetchProductSuccess>(`/product/${slug}`);
  return res.data;
};
