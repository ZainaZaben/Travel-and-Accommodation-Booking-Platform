import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { Formik, Form } from "formik";
import useUpdateCity from "./component/hooks/useUpdateCity";
import { City, Response } from "./api/types";
import useSearch from "@/pages/Admin/context/useAdmin";
import { validationSchema } from "../CreateCity/schema";

interface UpdateCityFormProps {
  open: boolean;
  onClose: () => void;
  entityData: Response | null;
}

const UpdateCityForm: React.FC<UpdateCityFormProps> = ({
  open,
  onClose,
  entityData,
}) => {
  const { updateCity, isLoading: isSubmitting } = useUpdateCity();

  const { cities, setCities } = useSearch();

  if (!entityData) {
    return null;
  }

  const handleUpdateClick = (values: City) => {
    updateCity({
      id: entityData.id,
      cityName: values.name,
      cityDescription: values.description,
    });
    const updatedCity = {
      ...entityData,
      name: values.name,
      description: values.description,
    };
    setCities(
      cities.map((city) => {
        if (city.id === entityData.id) return updatedCity;
        return city;
      })
    );
    onClose();
  };

  const initialValues = {
    name: entityData.name || "",
    description: entityData.description || "",
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} variant="persistent">
      <Box
        sx={{ width: 250 }}
        role="presentation"
        display="flex"
        flexDirection="column"
        mt={10}
      >
        <IconButton onClick={onClose} sx={{ width: "fit-content" }}>
          <ChevronRightIcon />
        </IconButton>

        <Typography variant="h6" sx={{ ml: 2 }}>
          Update City
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateClick}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box sx={{ m: 2 }}>
                <TextField
                  fullWidth
                  label="City Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update City"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default UpdateCityForm;
