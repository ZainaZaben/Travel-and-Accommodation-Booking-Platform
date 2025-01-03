/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addBookingAPI } from "../../../api"; // Import the API function
import { initialValues } from "../constants";
import { validationSchema } from "../paymentSchema";
import useSnackbar from "@/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { removeCart } from "@/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { setFormValues } from "@/features/checkoutSlice";

const useInformation = () => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using useMutation for adding a booking
  const { mutate: addBooking, isPending } = useMutation({
    mutationFn: addBookingAPI,
    onSuccess: (data) => {
      showSnackbar({
        severity: "success",
        message: "Your booking has been confirmed",
      });
      // dispatch(removeCart());
      navigate("/confirmation");
    },
    onError: () => {
      showSnackbar({
        severity: "error",
        message: "Sorry, your booking has failed",
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
      dispatch(setFormValues(values));
      addBooking({
        customerName: values.customerName,
        hotelName: "test",
        roomNumber: "test",
        roomType: "test",
        bookingDateTime: "2024-12-30T12:49:53.866Z",
        totalCost: 0,
        paymentMethod: values.paymentMethod.value,
      });

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
