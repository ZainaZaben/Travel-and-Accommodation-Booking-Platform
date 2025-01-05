import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import useRecentHotels from "./hooks/useGetRecentHotels";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

const RecentlyVisitedHotels: React.FC = () => {
  const { data: lastVisitedHotels, isLoading, error } = useRecentHotels();
  const navigate = useNavigate();

  const handleNavigation = (hotelId: number) => {
    navigate(`/hotel/${hotelId}`);
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
    </div>
  );
};

export default RecentlyVisitedHotels;
