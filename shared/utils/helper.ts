import { client } from "@shared/api";
import { AuthenticationQueryState } from "@shared/interface";
import { FormikProps } from "formik";

export const isFieldInvalid = (formik: FormikProps<any>, field: string) => {
  return formik.touched[field] && !!formik.errors[field];
};
