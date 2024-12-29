/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import styles from "./style.module.css";
import useSnackbar from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormValues } from "@/features/checkoutSlice";
import { postNewBooking } from "../../../../services/bookingServices";
import paymentSchema from "./paymentSchema";
import TextField from "@mui/material/TextField";

interface CartItem {
  roomId: string;
  roomType: string;
  price: number;
}

interface RootState {
  cart: {
    rooms: CartItem[];
  };
}

// Define the type for initial form values
interface PaymentFormValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: {
    state: string;
    city: string;
  };
  specialRequests: string;
}

const initialValues: PaymentFormValues = {
  fullName: "",
  email: "",
  paymentMethod: "Visa",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  billingAddress: {
    state: "",
    city: "",
  },
  specialRequests: "",
};

const paymentMethods = ["Visa", "MasterCard", "American Express", "Discover"];

// Utility function to format card numbers
const handleFormatCardNumber = (value: string): string => {
  const noSpacesValue = value.replace(/\s/g, "");
  return noSpacesValue.match(/.{1,4}/g)?.join(" ") || "";
};

const FormInformation: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const navigateToConfirmationPage = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.rooms);

  const handlePayment = async (values: PaymentFormValues) => {
    try {
      if (cart.length === 0) {
        showSnackbar({ message: "Your cart is empty." });
        return;
      }

      const bookingRequest = {
        customerName: values.fullName,
        paymentMethod: values.paymentMethod,
        roomNumber: cart[0].roomId,
        roomType: cart[0].roomType,
        totalCost: cart[0].price,
      };

      const response = await postNewBooking(bookingRequest);
      console.log("Booking response:", response);
      dispatch(setFormValues(values));
      showSnackbar({ message: "Completed! Thanks for your order!" });
      setTimeout(() => {
        navigateToConfirmationPage("/confirmation");
      }, 600);
    } catch (error) {
      showSnackbar({ message: "Sorry, your booking failed." });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Payment Information</h2>
      <p>
        To complete your booking, please provide your personal details and
        payment information. Additionally, feel free to include any special
        requests or remarks.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handlePayment}
        validationSchema={paymentSchema}
      >
        <Form>
          <TextField name="fullName" label="Full Name" />
          <TextField name="email" label="Email" type="email" />
          <TextField name="billingAddress.state" label="State" />
          <TextField name="billingAddress.city" label="City" />

          <TextField name="paymentMethod" select fullWidth>
            {paymentMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="cardNumber"
            label="Card Number"
            inputProps={{
              maxLength: 19,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const noSpacesValue = e.target.value.replace(/\s/g, "");
                const formattedValue = handleFormatCardNumber(noSpacesValue);
                e.target.value = formattedValue;
              },
            }}
          />

          <TextField
            name="expirationDate"
            label="Expiration Date MM/YY"
          />

          <TextField
            name="cvv"
            label="CVV"
            inputProps={{ maxLength: 4 }}
          />

          <TextField
            name="specialRequests"
            label="Special Requests or Remarks"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginX: "auto", display: "block" }}
          >
            Confirm and Pay
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormInformation;
