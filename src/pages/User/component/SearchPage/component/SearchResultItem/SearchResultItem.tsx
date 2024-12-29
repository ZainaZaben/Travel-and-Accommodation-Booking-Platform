import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import StarRating from "@/components/StarRating";
import { propsType } from "@/pages/User/component/SearchPage/types"; 
import React from "react";

const SearchResultItem: React.FC<{ hotel: propsType }> = ({ hotel }) => {
  const {
    hotelName,
    starRating,
    roomType,
    roomPrice,
    roomPhotoUrl,
    cityName,
    amenities,
  } = hotel;

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginBottom: 4,
          borderRadius: 5,
          padding: 2,
          gap: 2,
        }}
      >
        <CardMedia
          component="img"
          alt={`Thumbnail of ${hotelName}`}
          height="250"
          image={roomPhotoUrl}
          sx={{
            width: { xs: "100%", md: "40%" },
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {hotelName}
            <StarRating starsNumber={starRating} />
          </Typography>

          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {hotelName} in {cityName} offers {roomType} rooms.
          </Typography>

          <Box sx={{ marginTop: "1rem" }}>
            {amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity.name}
                sx={{
                  backgroundColor: "green",
                  color: "#fff",
                  fontSize: "0.9rem",
                  borderRadius: 5,
                  mr: 1.5,
                  mt: { xs: 1, md: 0 },
                }}
              />
            ))}
          </Box>

          <Box sx={{ m: 2 }}>
            <Typography variant="body1">
              <span style={{ fontWeight: 600 }}>US${roomPrice}/night</span>
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 5,
                width: { xs: "100%", md: "50%" },
              }}
            >
              See Availability
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchResultItem;
