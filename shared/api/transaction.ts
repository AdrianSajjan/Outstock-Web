import { AxiosErrorResponse, CreateTransactionState, Transaction } from "@shared/interface";
import api from "./api";

export const createTransaction = async (data: CreateTransactionState): Promise<Transaction> => {
  try {
    const res = await api.post("/transactions", data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const updateTransaction = async () => {
  try {
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};

export const fetchTransactionByID = async (id: string): Promise<Transaction> => {
  try {
    const res = await api.get(`/transactions/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
