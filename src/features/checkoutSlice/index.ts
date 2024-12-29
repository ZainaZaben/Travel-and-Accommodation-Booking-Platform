/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  formValues: Record<string, any> | null;
}

const initialState: FormState = {
  formValues: null,
};

const checkoutReducer = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormValues: (state, action: PayloadAction<Record<string, any>>) => {
      state.formValues = action.payload;
    },
    clearFormValues: (state) => {
      state.formValues = null;
    },
  },
});

export const { setFormValues, clearFormValues } = checkoutReducer.actions;
export default checkoutReducer.reducer;
