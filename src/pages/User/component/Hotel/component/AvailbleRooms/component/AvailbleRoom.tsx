/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Button, CardActions, Divider } from "@mui/material";
import { Baby, UsersRound } from "lucide-react";
import { roomType } from "../types";
import "../styles.css";

export interface roomTypeProps {
  roomDetails: roomType;
  handleAddToCart: (room: roomType) => void;
}

const RoomCard: React.FC<roomTypeProps> = ({
  roomDetails,
  handleAddToCart,
}) => {
  const {
    roomId,
    roomNumber,
    roomPhotoUrl,
    roomType,
    capacityOfAdults,
    capacityOfChildren,
    price,
    availability,
    quantity,
  } = roomDetails;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={roomPhotoUrl}
        alt={`Room ${roomNumber}`}
      />
      <CardContent className="roomCardContent">
        <Box>
          <Typography variant="h5" component="div">
            Room {roomNumber} - {roomType}
          </Typography>
          <Typography color="textSecondary">
            <Baby style={{ fontSize: "10px", marginRight: "8px" }} />
            <span style={{ fontSize: "20px" }}>{capacityOfAdults}</span>,
            <UsersRound
              style={{
                fontSize: "10px",
                marginRight: "8px",
                marginLeft: "10px",
              }}
            />
            <span style={{ fontSize: "20px" }}>{capacityOfChildren}</span>
          </Typography>
          <Typography color="textSecondary">
            Price: ${price} per night
          </Typography>
          <Box className="roomBox">
            <Typography color="textSecondary" mr={1}>
              Availability:
            </Typography>
            {availability ? (
              <CheckIcon color="success" />
            ) : (
              <CloseIcon color="error" />
            )}
          </Box>
        </Box>
        {/* Days section removed */}
      </CardContent>
      <CardActions className="roomCardAction">
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleAddToCart(roomDetails)}
          disabled={ !availability}
        >
          {availability
              ? "Add to Cart"
              : "Unavailable Room"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
