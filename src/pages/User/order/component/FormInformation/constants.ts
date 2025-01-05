import { Booking, PaymentMethod } from "./types";

export const initialValues: Booking = {
  customerName: "",
  email: "",
  state: "",
  city: "",
  paymentMethod: {
    value: "",
  },
  cardNumber: "",
  expDate: "",
  CVV: "",
  notes: "",
};

export const paymentMethods: Array<PaymentMethod> = [
  {
    name: "Visa",
    value: "Visa",
  },
  {
    name: "Master Card",
    value: "Master Card",
  },
  {
    name: "Cash",
    value: "Cash",
  },
];
