import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const createAccountSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  pin: yup.string().min(4).max(4).required("Pin is required"),
});

export const loginAccountShema = yup.object().shape({
  pin: yup.string().min(4).max(4).required("Pin is required"),
});
