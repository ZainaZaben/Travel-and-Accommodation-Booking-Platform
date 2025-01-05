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
import { useState } from "react";
import { RoomResponse } from "./api/types";
import { validationSchema } from "./roomConfig";
import useUpdateRoom from "./hooks/useUpdateRoom";

import useSearch from "@/pages/Admin/context/useAdmin";
interface UpdateRoomFormProps {
  open: boolean;
  onClose: () => void;
  entityData: RoomResponse | null;
}

const EditRoomForm: React.FC<UpdateRoomFormProps> = ({
  open,
  onClose,
  entityData,
}) => {
  const { updateRoom } = useUpdateRoom();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { rooms, setRooms } = useSearch();

  if (!entityData) {
    return null;
  }

  const handleUpdateClick = (values: RoomResponse, actions) => {
    setIsSubmitting(true);
    try {
      updateRoom({
        id: entityData.roomId,
        roomNumber: values.roomNumber.toString(),
        price: values.price,
      });
      const updatedRoom = {
        ...entityData,
        roomNumber: values.roomNumber,
        price: values.price,
      };
      setRooms(
        rooms.map((room) => {
          if (room.roomId === entityData.roomId) return updatedRoom;
          return room;
        })
      );
    } finally {
      onClose();
      actions.setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const initialValues = {
    roomNumber: entityData.roomNumber || "",
    price: entityData.price || "",
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
          Update Room
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
                  label="Room Number"
                  name="roomNumber"
                  value={values.roomNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.roomNumber && Boolean(errors.roomNumber)}
                  helperText={touched.roomNumber && errors.roomNumber}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  autoFocus
                >
                  {isSubmitting ? "Updating..." : "Update Room"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default EditRoomForm;
