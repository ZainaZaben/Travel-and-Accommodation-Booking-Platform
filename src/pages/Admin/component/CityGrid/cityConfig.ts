import * as Yup from "yup";

interface Field {
  name: string;
  label: string;
  type: string;
}

export const fields: Field[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});
