import { FormikHelpers, useFormik } from "formik";
import { validationSchema } from "@/pages/Admin/component/Hotels/component/CreateHotel/schema";
import { useMutation } from "@tanstack/react-query";
import useSnackbar from "@/hooks/useSnackbar";
import { createHotel } from "../api";
import { RequestBody } from "@/pages/Admin/component/Hotels/component/CreateHotel/types";
import { INITIAL_FORM_STATE } from "@/pages/Admin/component/Hotels/component/CreateHotel/constant";
import useAdmin from "@/pages/Admin/context/useAdmin";
const useCreateHotel = () => {
  const { showSnackbar } = useSnackbar();
  const { setHotels, hotels } = useAdmin();
  const { mutate, isPending } = useMutation({
    mutationFn: createHotel,
    onSuccess: (data) => {
      setHotels([...hotels, data.data]);
      showSnackbar({
        severity: "success",
        message: "Create New Hotel Success",
      });
    },
    onError: () => {
      showSnackbar({
        severity: "error",
        message: "Error Create Hotel",
      });
    },
  });
  const formik = useFormik<RequestBody>({
    initialValues: INITIAL_FORM_STATE,
    onSubmit: (values, { resetForm }: FormikHelpers<RequestBody>) => {
      mutate(values);
      resetForm();
    },
    validationSchema,
    validateOnMount: true,
  });

  return {
    formik,
    isPending,
  };
};

export default useCreateHotel;
