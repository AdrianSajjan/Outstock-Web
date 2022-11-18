import { AxiosErrorResponse, Cart, FetchCartSuccess, RemoveItemFromCartState, UpdateCartState } from "@shared/interface";
import api from "./api";

export const fetchPaymentPublicKey = async (): Promise<{ key: string }> => {
  try {
    const res = await api.get("/user/payment/key");
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const fetchCart = async (): Promise<Cart> => {
  try {
    const res = await api.get("/cart/active");
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const addToCart = async (data: UpdateCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.post(`/cart/${data.id}/add`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const removeProductFromCart = async (data: UpdateCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.post(`/cart/${data.id}/delete`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const removeItemFromCart = async ({ id, item }: RemoveItemFromCartState): Promise<FetchCartSuccess> => {
  try {
    const res = await api.delete(`/cart/${id}/item/${item}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
