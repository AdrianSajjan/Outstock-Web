import * as Yup from "yup";

export const LoginFormValidation = Yup.object().shape({
  emailAddress: Yup.string().required("Email address is required").email("Please provide a valid email address"),
  password: Yup.string().required("Password is required"),
});
