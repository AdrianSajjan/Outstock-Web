import { AxiosError } from "axios";
import { CreateOrderState, ErrorResponse, Order, UpdateOrderState } from "@shared/interface";
import api from "./api";

export const createOrder = async (data: CreateOrderState): Promise<Order> => {
  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const updateOrder = async (data: UpdateOrderState): Promise<Order> => {
  try {
    const res = await api.patch(`/orders/${data.id}`, data);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};
