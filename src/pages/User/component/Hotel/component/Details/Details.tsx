import React from "react";
import { Box, Typography, Paper, Rating, Divider } from "@mui/material";
import CustomerFeedback from "./FeedBack";
import useGetGuestReviews from "./hooks/useGetReviews";
import Loader from "@/container/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";
import useGetAmenities from "./hooks/useGetAmenitties";

interface HotelInfoProps {
  name: string;
  starRating: number;
  description: string;
  city: string;
  id: string | undefined;
}

const HotelInfo: React.FC<HotelInfoProps> = ({
  name,
  starRating,
  description,
  city,
  id,
}) => {
  const { data: reviewData } = useGetGuestReviews(id);
  const { data: amenities, isLoading: amenitiesLoading } = useGetAmenities();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        height: "775px",
        overflow: "scroll",
        overflowX: "hidden",
        border: "2px solid",
        borderColor: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Rating name="star-rating" value={starRating} precision={0.5} readOnly />
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
      <Typography my={2} variant="body1">
        <FontAwesomeIcon icon={faLocationPin} style={{ marginRight: "8px" }} />
        {city}
      </Typography>

      <div className={styles.hotelAmenities}>
        <h3>Amenities</h3>
        {amenitiesLoading ? (
          <Loader />
        ) : (
          <ul>
            {amenities?.map((amenity, index) => (
              <li key={index} className={styles.amenityItem}>
                <CheckCircleIcon sx={{ color: "green" }} />
                {amenity.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Typography variant="h6" align="center" gutterBottom>
        Guest-Reviews
      </Typography>
      <Divider />
      {reviewData ? (
        reviewData.map((item) => (
          <CustomerFeedback
            key={item.reviewId}
            customerName={item.customerName}
            rating={item.rating}
            description={item.description}
          />
        ))
      ) : (
        <Loader />
      )}
    </Paper>
  );
};

export default HotelInfo;
