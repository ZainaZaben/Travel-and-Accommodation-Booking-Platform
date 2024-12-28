import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "./authSlice";
import openReducer from "./openSlice";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
import snackbar from "./snackbar";
const persistAuthConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  open: openReducer,
  cart: cartReducer,
  snackBar:snackbar,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
