import * as Yup from "yup";

export const LoginFormValidation = Yup.object().shape({
  emailAddress: Yup.string().required("Email address is required").email("Please provide a valid email address"),
  password: Yup.string().required("Password is required"),
});

export const RegistrationFormValidation = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Please provide a valid phone number"),
  emailAddress: Yup.string().required("Email address is required").email("Please provide a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters and atleast one letter and one number"),
  confirmPassword: Yup.string()
    .required("Please re-enter your password")
    .oneOf([Yup.ref("password"), null], "Password's doesn't match"),
});
