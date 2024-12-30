/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  formValues: Record<string, any> | null;
}

const initialState: FormState = {
  formValues: {},
};

const checkoutReducer = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    clearFormValues: (state) => {
      state.formValues = null;
    },
  },
});

export const { setFormValues, clearFormValues } = checkoutReducer.actions;
export default checkoutReducer.reducer;
