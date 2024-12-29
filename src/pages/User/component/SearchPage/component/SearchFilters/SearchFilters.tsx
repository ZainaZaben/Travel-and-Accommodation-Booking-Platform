import { Formik, Form } from "formik";
import {
  Slider,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Box,
} from "@mui/material";
import styles from "./style.module.css";
import React from "react";

// Initial values for the form
const initialValues = {
  priceRange: [50, 180],
  starRating: null,
  amenities: [] as string[],
  roomType: "",
  sort: "",
};

const SearchFilters: React.FC = () => {
  // Handle filtration on form submission
  const handleFiltration = (values: typeof initialValues) => {
    const starRating = values.starRating !== "" ? parseInt(values.starRating as string) : "";
    // Here, you can handle the values after filtration, like updating a state or making an API call
    console.log({
      ...values,
      starRating: starRating,
    });
  };

  // Handle clear filters
  const handleClearFilters = (resetForm: () => void) => {
    console.log(initialValues); // Reset values here, maybe dispatch or update state
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFiltration}>
      {({ values, handleChange, handleSubmit, resetForm }) => (
        <Form style={{ flex: 1.2 }}>
          <div className={styles.filterSide}>
            {/* Price Range Slider */}
            <FormControl component="fieldset" sx={{ width: "100%", mb: 2 }}>
              <FormLabel component="legend">Your Budget per night:</FormLabel>
              <Slider
  value={values.priceRange}
  onChange={(event, newValue) => {
    handleChange({
      target: {
        name: "priceRange",
        value: newValue,
      },
    });
  }}
  valueLabelDisplay="auto"
  valueLabelFormat={(value) => `$${value}`}
  min={20}
  max={400}
  step={10}
/>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ marginBottom: 1 }}
              >
                ${values.priceRange[0]} - ${values.priceRange[1]}
              </Typography>
            </FormControl>

            {/* Star Rating */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Star Rating:</FormLabel>
              <RadioGroup
                aria-label="star-rating"
                name="star-rating"
                value={values.starRating}
                onChange={handleChange("starRating")}
              >
                {[3, 4, 5].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    value={rating}
                    control={<Radio />}
                    label={`${rating} Stars`}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Amenities */}
            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Amenities:</FormLabel>
              <FormGroup>
                {["Spa Services", "Private Balcony", "Fireplace"].map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        checked={values.amenities.includes(amenity)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          handleChange({
                            target: {
                              name: "amenities",
                              value: isChecked
                                ? [...values.amenities, amenity]
                                : values.amenities.filter((item) => item !== amenity),
                            },
                          });
                        }}
                        name={amenity}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </FormGroup>
            </FormControl>

            {/* Room Type */}
            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Room Type:</FormLabel>
              <RadioGroup
                aria-label="room-type"
                name="room-type"
                value={values.roomType}
                onChange={handleChange("roomType")}
              >
                {["King Suite", "Standard", "Cabin"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Sort By */}
            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup
                aria-label="sort-by"
                name="sort-by"
                value={values.sort}
                onChange={handleChange("sort")}
              >
                {["Price", "Rating"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
                gap: 1,
              }}
            >
              <Button
  type="submit"
  variant="contained"
  color="primary"
  onClick={() => {
    // e.preventDefault(); // Optional, prevents default behavior.
    handleSubmit(); // Call Formik's handleSubmit explicitly.
  }}
  sx={{ width: 150 }}
>
  Filter
</Button>


              <Button
                type="reset"
                variant="contained"
                color="error"
                onClick={() => handleClearFilters(resetForm)}
                sx={{ width: 150 }}
              >
                Clear Filters
              </Button>
            </Box>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchFilters;
