import * as yup from "yup";

export const validationSchema = yup.object().shape({
  customerName: yup.string().required("Please enter your full name"),
  email: yup.string().email().required("Please enter your email"),
  state: yup.string().required("Please enter your state"),
  city: yup.string().required("Please enter your city"),
  paymentMethod: yup
    .object()
    .shape({
      name: yup.string(),
      value: yup.string(),
    })
    .required("Please select your payment method"),
  cardNumber: yup
    .string()
    .when(
      "paymentMethod.value",
      (value: Array<string>, schema: yup.StringSchema) => {
        return value.includes("Cash")
          ? schema.optional()
          : schema
              .required("Please enter your card number")
              .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number");
      }
    ),
  expDate: yup
    .string()
    .when(
      "paymentMethod.value",
      (value: Array<string>, schema: yup.StringSchema) => {
        return value.includes("Cash")
          ? schema.optional()
          : schema
              .required("Please enter the card expiration date")
              .matches(
                /^(0?[1-9]|1[0-2])\/?(2[4-9]|3[0-9]|4[0-9]|50)$/,
                "Invalid expiration date format"
              );
      }
    ),
  CVV: yup
    .string()
    .when(
      "paymentMethod.value",
      (value: Array<string>, schema: yup.StringSchema) => {
        return value.includes("Cash")
          ? schema.optional()
          : schema
              .required("Please enter the card CVV")
              .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits");
      }
    ),
  notes: yup.string(),
});
