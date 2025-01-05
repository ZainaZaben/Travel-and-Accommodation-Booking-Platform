import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  roomNumber: Yup.string().required("Name is required"),
  price: Yup.string().required("Description is required"),
});
