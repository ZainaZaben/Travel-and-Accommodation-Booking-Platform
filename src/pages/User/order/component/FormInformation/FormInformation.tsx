import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { paymentMethods } from "./constants";
import { PaymentMethod } from "./types";
import styles from "./style.module.css";
import colors from "@/constant/colorConstants";
import useInformation from "./hooks/useInformation";

const FormInformation: React.FC = () => {
  const { formik, handleFormatCardNumber } = useInformation();
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Payment Information</h2>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={styles.formField}
          name="customerName"
          label="Full Name"
          value={formik.values.customerName}
          onChange={formik.handleChange}
          fullWidth
          onBlur={formik.handleBlur}
          error={
            formik.touched.customerName && Boolean(formik.errors.customerName)
          }
          helperText={formik.touched.customerName && formik.errors.customerName}
        />

        <TextField
          className={styles.formField}
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className={styles.formField}
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          fullWidth
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />

        <TextField
          className={styles.formField}
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          fullWidth
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <TextField
          className={styles.formField}
          name="paymentMethod.value"
          label="Payment Method"
          select
          value={formik.values.paymentMethod.value}
          onChange={(e) =>
            formik.setFieldValue("paymentMethod.value", e.target.value)
          }
          fullWidth
          onBlur={formik.handleBlur}
          error={
            formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)
          }
          helperText={
            formik.touched.paymentMethod?.value &&
            formik.errors.paymentMethod?.value
          }
        >
          {paymentMethods.map((method: PaymentMethod) => (
            <MenuItem key={method.value} value={method.value}>
              {method.name}
            </MenuItem>
          ))}
        </TextField>

        {formik.values.paymentMethod?.value !== "Cash" && (
          <>
            <TextField
              className={styles.formField}
              name="cardNumber"
              label="Card Number"
              value={formik.values.cardNumber}
              onChange={(e) => {
                const formattedValue = handleFormatCardNumber(e.target.value);
                formik.setFieldValue("cardNumber", formattedValue);
              }}
              inputProps={{ maxLength: 19 }}
              fullWidth
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />

            <TextField
              className={styles.formField}
              name="expDate"
              label="Expiration Date MM/YY"
              value={formik.values.expDate}
              onChange={formik.handleChange}
              fullWidth
              onBlur={formik.handleBlur}
              error={formik.touched.expDate && Boolean(formik.errors.expDate)}
              helperText={formik.touched.expDate && formik.errors.expDate}
            />

            <TextField
              className={styles.formField}
              name="CVV"
              label="CVV"
              value={formik.values.CVV}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 4 }}
              fullWidth
              onBlur={formik.handleBlur}
              error={formik.touched.CVV && Boolean(formik.errors.CVV)}
              helperText={formik.touched.CVV && formik.errors.CVV}
            />
          </>
        )}

        <TextField
          className={styles.formField}
          name="notes"
          label="Special Requests or Remarks"
          value={formik.values.notes}
          onChange={formik.handleChange}
          multiline
          rows={4}
          fullWidth
          onBlur={formik.handleBlur}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: colors.primaryColor }}
          sx={{ marginX: "auto", display: "block" }}
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
};

export default FormInformation;
