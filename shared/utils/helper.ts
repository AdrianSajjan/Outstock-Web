import { Transaction } from "@shared/interface";
import { FormikProps } from "formik";

export const isFieldInvalid = (formik: FormikProps<any>, field: string) => {
  return formik.touched[field] && !!formik.errors[field];
};

export const parsePaymentType = (transaction?: Transaction) => {
  if (!transaction) return "";
  else if (transaction.paymentStatus === "failed" || transaction.method !== "card") return transaction.paymentID;
  else return `${transaction.card?.network} - ${transaction.card?.lastFourDigits}`;
};
