import { FormikProps } from "formik";

export const isFieldInvalid = (formik: FormikProps<any>, field: string) => {
  return formik.touched[field] && !!formik.errors[field];
};
