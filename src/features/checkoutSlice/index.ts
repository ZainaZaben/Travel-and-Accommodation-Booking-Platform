// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { initialValues } from "@/pages/User/order/component/FormInformation/constants";
// import { Checkout } from "@/pages/User/order/component/FormInformation/types";
// import { createSlice } from "@reduxjs/toolkit";

// interface FormState {
//   formValues: Checkout;
// }

// const initialState: FormState = {
//   formValues: initialValues,
// };

// const checkoutReducer = createSlice({
//   name: "form",
//   initialState,
//   reducers: {
//     setFormValues: (state, action) => {
//       state.formValues = action.payload;
//     },
//     clearFormValues: (state) => {
//       state.formValues = null;
//     },
//   },
// });

// export const { setFormValues, clearFormValues } = checkoutReducer.actions;
// export default checkoutReducer.reducer;
import { Confirmation } from "@/pages/User/order/component/FormInformation/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  formValues: {} as Confirmation,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setFormValues(state, action) {
      state.formValues = action.payload;
    },
    clearFormValues(state) {
      state.formValues = {} as Confirmation;
    },
  },
});

export const { setFormValues, clearFormValues } = checkoutSlice.actions;
export default checkoutSlice.reducer;