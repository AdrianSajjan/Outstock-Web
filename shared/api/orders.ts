import { AxiosErrorResponse, CreateOrderState, Order, UpdateOrderState } from "@shared/interface";
import api from "./api";

export const createOrder = async (data: CreateOrderState): Promise<Order> => {
  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const updateOrder = async (data: UpdateOrderState): Promise<Order> => {
  try {
    const res = await api.patch(`/orders/${data.id}`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const fetchOrderByID = async (id: string): Promise<Order> => {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const res = await api.get(`/orders/user`);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
