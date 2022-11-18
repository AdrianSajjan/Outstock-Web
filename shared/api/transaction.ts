import { CreateTransactionState, ErrorResponse, Transaction } from "@shared/interface";
import { AxiosError } from "axios";
import api from "./api";

export const createTransaction = async (data: CreateTransactionState): Promise<Transaction> => {
  try {
    const res = await api.post("/transactions", data);
    return res.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};

export const updateTransaction = async () => {
  try {
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw error.response ? error.response.data.message : error.message;
  }
};
