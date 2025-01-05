import * as React from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useFormik } from "formik";
import { Response } from "@/pages/Admin/component/CityGrid/api/types";
import { RequestBody } from "./types";
import { ModalType, types } from "@/pages/Admin/types";

interface ModalProps {
  handleClose: () => void;
  open: ModalType;
  type: string;
  isPending: boolean;
  formik: ReturnType<typeof useFormik<RequestBody>>;
  data?: Response[] | undefined;
}

const SlidingWindowForm: React.FC<ModalProps> = ({
  handleClose,
  open,
  type,
  isPending,
  formik,
  data,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open.open}
      onClose={handleClose}
      variant="persistent"
    >
      <Box
        sx={{ width: 350 }}
        role="presentation"
        display="flex"
        flexDirection="column"
        mt={10}
      >
        <IconButton onClick={handleClose} sx={{ width: "fit-content" }}>
          <ChevronRightIcon />
        </IconButton>

        <Typography variant="h6" sx={{ textAlign: "center", color: "#00acc1" }}>
          Enter Hotel Information
        </Typography>
        <Divider />

        <form onSubmit={formik.handleSubmit}>
          {type === types.CREATE && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select City
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="cityId"
                label="Select City"
                value={formik.values.cityId}
                onChange={formik.handleChange}
              >
                {data?.map((city) => (
                  <MenuItem value={city.id} key={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <div style={{ margin: "1rem 0px" }}>
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
            />
          </div>
          <div style={{ margin: "1rem 0px" }}>
            <TextField
              id="hotelType"
              name="hotelType"
              label="Hotel Type"
              type="number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.hotelType}
              error={
                formik.touched.hotelType && Boolean(formik.errors.hotelType)
              }
              helperText={formik.touched.hotelType && formik.errors.hotelType}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="starRating"
              name="starRating"
              type="number"
              label="Rating"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.starRating}
              error={
                formik.touched.starRating && Boolean(formik.errors.starRating)
              }
              helperText={formik.touched.starRating && formik.errors.starRating}
              fullWidth
            />
          </div>
          <div style={{ margin: "1rem 0px" }}>
            <TextField
              id="latitude"
              name="latitude"
              label="Latitude"
              type="number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.latitude}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="longitude"
              name="longitude"
              label="Longitude"
              type="number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.longitude}
              error={
                formik.touched.longitude && Boolean(formik.errors.longitude)
              }
              helperText={formik.touched.longitude && formik.errors.longitude}
              fullWidth
            />
          </div>
          <Button
            type="submit"
            sx={{ mt: "1rem" }}
            variant="contained"
            fullWidth
            color="primary"
            disabled={isPending}
          >
            {`${type} Hotel`}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default SlidingWindowForm;
