import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  token: string;
  userType: string;
}

interface actionType {
  payload: initialStateType;
}

const initialState: initialStateType = {
  token: "",
  userType: "",
};

export const authSlice = createSlice({
  name: "zaina-auth", 
  initialState,
  reducers: {
    loginSuccess: (state: initialStateType, action: actionType) => {
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    logOut: (state) => {
      state.token = "";
      state.userType = "";
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;