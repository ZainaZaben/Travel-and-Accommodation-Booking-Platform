import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
// import GenericSnackbar from "../../../../components/GenericSnackbar";
import useRecentHotels from "./hooks/useGetRecentHotels";
// import { useDispatch } from "react-redux";
// import { showSnackbar } from "@/features/snackbar";
import styles from "./style.module.css";

const RecentlyVisitedHotels: React.FC = () => {
  const { data: lastVisitedHotels, isLoading, error } = useRecentHotels();
    // const dispatch= useDispatch();

  const handleNavigation = (hotelId: number) => {
    // dispatch(showSnackbar({}))
    console.log(`Navigate to hotel ID: ${hotelId}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !lastVisitedHotels) {
    return (
      <Typography variant="h6" color="error">
        Failed to load hotels.
      </Typography>
    );
  }

  return (
    <div className={styles.RecentlyVisitedHotelsContainer}>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Recently Visited Hotels
      </h2>
      <Grid container spacing={2}>
        {lastVisitedHotels.map((hotel) => (
          <Grid item key={hotel.hotelId} xs={12} sm={6}>
            <Card
              onClick={() => handleNavigation(hotel.hotelId)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "2px 2px 4px rgba(8, 12, 2, 0.2), -2px -2px 4px rgba(8, 12, 2, 0.2)",
              }}
            >
              <CardMedia
                component="img"
                alt={hotel.hotelName}
                height="250"
                image={hotel.thumbnailUrl}
                style={{ width: "100%", objectFit: "cover" }}
              />

              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {hotel.hotelName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { lg: "1rem" } }}
                >
                  {`${hotel.cityName} | ${hotel.starRating} Stars | Price Range: $${hotel.priceLowerBound} - $${hotel.priceUpperBound}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* 
      <GenericSnackbar
        open={false} // Set this as per your snackbar state
        message="Success"
        severity="success" // Adjust according to your use case
        onClose={() => {}}
      /> */}
    </div>
  );
};

export default RecentlyVisitedHotels;
