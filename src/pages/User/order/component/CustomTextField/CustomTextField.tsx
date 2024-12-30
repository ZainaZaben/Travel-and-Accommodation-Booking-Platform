import { Field, ErrorMessage } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import styles from "./style.module.css";

type CustomTextFieldProps = TextFieldProps & {
  name: string;
  label: string;
  type?: string;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  type = "text",
  ...otherProps
}) => {
  return (
    <div className={styles.field}>
      <Field
        name={name}
        as={TextField}
        label={label}
        type={type}
        fullWidth
        {...otherProps}
      />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default CustomTextField;
