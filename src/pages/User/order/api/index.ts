import axiosInstance from "@/api";
import { AddBookingAPIResponse } from "./types";

export const addBookingAPI = async (payload) => {
  return axiosInstance
    .post<AddBookingAPIResponse>("/bookings", payload)
    .then((response) => response.data);
};
