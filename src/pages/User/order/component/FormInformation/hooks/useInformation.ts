import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addBookingAPI } from "../../../api";  // Import the API function
import { initialValues } from "../constants";
import { validationSchema } from "../paymentSchema";
import useSnackbar from "@/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { removeCart } from "@/features/cartSlice";
import { useNavigate } from "react-router-dom";

const useInformation = () => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using useMutation for adding a booking
  const { mutate: addBooking, isPending } = useMutation({
    mutationFn: addBookingAPI,
    onSuccess: (data) => {
      showSnackbar({ severity: "success", message: "Your booking has been confirmed" });
      dispatch(removeCart());  // Assuming this clears the cart after booking
      navigate("confirmation");  // Redirect to a confirmation page
    },
    onError: () => {
      showSnackbar({ severity: "error", message: "Sorry, your booking has failed" });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      // When form is submitted, call the mutation function to add a booking
      addBooking(values);  // This triggers the mutation with the form values
      resetForm();
    },
    validationSchema,
    validateOnMount: true,
  });

  // Utility function to format card number input
  const handleFormatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/\D/g, "").replace(/(.{4})(?=.)/g, "$1 ");
  };

  return {
    formik,
    isPending,
    handleFormatCardNumber,
  };
};

export default useInformation;
