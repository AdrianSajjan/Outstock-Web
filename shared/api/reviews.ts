import { AddReviewState, AxiosErrorResponse } from "@shared/interface";
import api from "./api";

export const addReview = async (data: AddReviewState): Promise<void> => {
  try {
    const res = await api.post("/reviews", data);
    return res.data;
  } catch (e) {
    const error = e as AxiosErrorResponse;
    throw error.response ? { message: error.response.data.message, status: error.response.status } : { message: error.message, error: error.status };
  }
};
