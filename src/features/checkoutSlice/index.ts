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
