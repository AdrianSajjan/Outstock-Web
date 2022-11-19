import { Transaction } from "@shared/interface";
import { FormikProps } from "formik";

export const isFieldInvalid = (formik: FormikProps<any>, field: string) => {
  return formik.touched[field] && !!formik.errors[field];
};

export const parsePaymentType = (transaction?: Transaction) => {
  if (!transaction) return "";
  if (transaction.method === "card") return `${transaction.card?.network} - ${transaction.card?.lastFourDigits}`;
  else return transaction.paymentID;
};
