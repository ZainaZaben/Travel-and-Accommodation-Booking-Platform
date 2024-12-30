import { removeCart } from "@/features/cartSlice";
import useSnackbar from "@/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBookingAPI } from "../api";

const useAddBookingAPI = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: addBooking, isPending } = useMutation({
    mutationFn: addBookingAPI,
    onSuccess: () => {
        showSnackbar({ severity: "success", message: "Your booking has been confirmed" });
      dispatch(removeCart());

      navigate("/confirmation");
    },
    onError: () => {
      showSnackbar({ severity: "error", message: "Sorry, your booking is failed" });
    },
  });

  return {
    addBooking,
    isPending,
  };
};

export default useAddBookingAPI;