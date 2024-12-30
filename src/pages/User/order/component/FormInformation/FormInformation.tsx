// import { Form, Formik } from "formik";
// import { Button, MenuItem } from "@mui/material";
// import { validationSchema } from "./paymentSchema";
// import { initialValues, paymentMethods } from "./constants";
// import { PaymentMethod } from "./types";
// import styles from "./style.module.css";
// import colors from "@/constant/colorConstants";
// import CustomTextField from "../CustomTextField";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setFormValues } from "@/features/checkoutSlice";

// const FormInformation: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleConfirmBooking = () => {
//     navigate("/confirmation");
//   };

//   const handlePayment = async (values) => {
//     console.log("Form submitted with values:", values);

//     await dispatch(setFormValues(values));
//     handleConfirmBooking();
//   };

//   const handleFormatCardNumber = (value) => {
//     const noSpacesValue = value.replace(/\s/g, "");
//     return noSpacesValue && noSpacesValue.match(/.{1,4}/g).join(" ");
//   };

//   return (
//     <div className={styles.formContainer}>
//       <h2 className={styles.formHeader}>Payment Information</h2>

//       <Formik
//         initialValues={initialValues}
//         onSubmit={handlePayment}
//         validationSchema={validationSchema}
//       >
//         {({ values, handleChange, setFieldValue }) => (
//           <Form>
//             <CustomTextField
//               name="customerName"
//               label="Full Name"
//               value={values.customerName}
//               onChange={handleChange}
//               fullWidth
//               required
//             />

//             <CustomTextField
//               name="email"
//               label="Email"
//               type="email"
//               value={values.email}
//               onChange={handleChange}
//               fullWidth
//               required
//             />

//             <CustomTextField
//               name="state"
//               label="State"
//               value={values.state}
//               onChange={handleChange}
//               fullWidth
//               required
//             />

//             <CustomTextField
//               name="city"
//               label="City"
//               value={values.city}
//               onChange={handleChange}
//               fullWidth
//               required
//             />

//             <CustomTextField
//               name="paymentMethod.value"
//               label="Payment Method"
//               select
//               value={values.paymentMethod.value}
//               onChange={(e) => {
//                 setFieldValue("paymentMethod.value", e.target.value);
//               }}
//               fullWidth
//               required
//             >
//               {paymentMethods.map((method: PaymentMethod) => (
//                 <MenuItem key={method.value} value={method.value}>
//                   {method.name}
//                 </MenuItem>
//               ))}
//             </CustomTextField>

//             {values.paymentMethod.value !== "Cash" && (
//               <CustomTextField
//                 name="cardNumber"
//                 label="Card Number"
//                 value={values.cardNumber}
//                 onChange={handleChange}
//                 inputProps={{
//                   maxLength: 19,
//                   onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
//                     const noSpacesValue = e.target.value.replace(/\s/g, "");
//                     const formattedValue =
//                       handleFormatCardNumber(noSpacesValue);
//                     e.target.value = formattedValue;
//                   },
//                 }}
//                 fullWidth
//                 required
//               />
//             )}

//             {values.paymentMethod.value !== "Cash" && (
//               <CustomTextField
//                 name="expDate"
//                 label="Expiration Date MM/YY"
//                 value={values.expDate}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             )}

//             {values.paymentMethod.value !== "Cash" && (
//               <CustomTextField
//                 name="CVV"
//                 label="CVV"
//                 value={values.CVV}
//                 onChange={handleChange}
//                 inputProps={{ maxLength: 4 }}
//                 fullWidth
//                 required
//               />
//             )}

//             <CustomTextField
//               name="notes"
//               label="Special Requests or Remarks"
//               value={values.notes}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               fullWidth
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               style={{ backgroundColor: colors.primaryColor }}
//               sx={{ marginX: "auto", display: "block" }}
//               onClick={handlePayment}
//             >
//               Confirm Booking
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default FormInformation;




import React from "react";
import { Button, MenuItem } from "@mui/material";
import { paymentMethods } from "./constants";
import { PaymentMethod } from "./types";
import styles from "./style.module.css";
import colors from "@/constant/colorConstants";
import CustomTextField from "../CustomTextField";
import useInformation from "./hooks/useInformation";

const FormInformation: React.FC = () => {
  const { formik, handleFormatCardNumber } = useInformation();

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Payment Information</h2>

      {/* Using form onSubmit */}
      <form onSubmit={formik.handleSubmit}>
        <CustomTextField
          name="customerName"
          label="Full Name"
          value={formik.values.customerName}
          onChange={formik.handleChange}
          fullWidth
          required
        />

        <CustomTextField
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          required
        />

        <CustomTextField
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          fullWidth
          required
        />

        <CustomTextField
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          fullWidth
          required
        />

        <CustomTextField
          name="paymentMethod.value"
          label="Payment Method"
          select
          value={formik.values.paymentMethod.value}
          onChange={(e) => formik.setFieldValue("paymentMethod.value", e.target.value)}
          fullWidth
          required
        >
          {paymentMethods.map((method: PaymentMethod) => (
            <MenuItem key={method.value} value={method.value}>
              {method.name}
            </MenuItem>
          ))}
        </CustomTextField>

        {formik.values.paymentMethod.value !== "Cash" && (
          <>
            <CustomTextField
              name="cardNumber"
              label="Card Number"
              value={formik.values.cardNumber}
              onChange={(e) => {
                const formattedValue = handleFormatCardNumber(e.target.value);
                formik.setFieldValue("cardNumber", formattedValue);
              }}
              inputProps={{ maxLength: 19 }}
              fullWidth
              required
            />

            <CustomTextField
              name="expDate"
              label="Expiration Date MM/YY"
              value={formik.values.expDate}
              onChange={formik.handleChange}
              fullWidth
              required
            />

            <CustomTextField
              name="CVV"
              label="CVV"
              value={formik.values.CVV}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 4 }}
              fullWidth
              required
            />
          </>
        )}

        <CustomTextField
          name="notes"
          label="Special Requests or Remarks"
          value={formik.values.notes}
          onChange={formik.handleChange}
          multiline
          rows={4}
          fullWidth
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
