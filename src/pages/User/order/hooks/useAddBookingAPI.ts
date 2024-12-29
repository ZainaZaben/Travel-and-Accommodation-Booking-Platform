import { removeCart } from "@/features/cartSlice";
import useSnackbar from "@/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { getUrlQueryString } from "@/utils/urlQueryParams";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBookingAPI } from "../api";
import { AddBookingAPIResponse } from "../api/types";

const useAddBookingAPI = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: addBooking, isPending } = useMutation({
    mutationFn: addBookingAPI,
    onSuccess: (response: AddBookingAPIResponse) => {
        showSnackbar({ message: "Your booking has been confirmed" });
      dispatch(removeCart());

      const urlWithQuery = getUrlQueryString(
        "/me/booking-confirmation",
        response
      );
      navigate(urlWithQuery);
    },
    onError: () => {
        showSnackbar({ message: "Sorry, your booking is failed" });
    },
  });

  return {
    addBooking,
    isPending,
  };
};

export default useAddBookingAPI;