import { Cart, ErrorResponse, FetchCartSuccess, RemoveItemFromCartState, UpdateCartState } from "@shared/interface";
import { AxiosError } from "axios";
import api from "./api";

export const fetchCart = async (): Promise<Cart> => {
  try {
    const res = await api.get("/cart/active");
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const addToCart = async (data: UpdateCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.post(`/cart/${data.id}/add`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const removeProductFromCart = async (data: UpdateCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.post(`/cart/${data.id}/delete`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const removeItemFromCart = async ({ id, item }: RemoveItemFromCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.delete(`/cart/${id}/item/${item}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};
