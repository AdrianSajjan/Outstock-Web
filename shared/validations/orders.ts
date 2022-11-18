import * as Yup from "yup";

export const OrderValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  addressLineOne: Yup.string().required("Address Line One is required"),
  cityOrDistrict: Yup.string().required("City or District is required"),
  emailAddress: Yup.string().required("Email Address is required").email("Please provide a valid email"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Please provide a valid phone number"),
  pinCode: Yup.string()
    .required("PIN Code is required")
    .matches(/^[1-9][0-9]{5}$/, "Please provide a valid PIN code"),
  state: Yup.string().required("State is required"),
  addressLineTwo: Yup.string().optional(),
});
