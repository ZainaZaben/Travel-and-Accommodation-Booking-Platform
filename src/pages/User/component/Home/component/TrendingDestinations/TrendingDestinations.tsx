import Loader from "@/container/Loader";
import { Grid } from "@mui/material";
import useGetTrendingHighLight from "./hooks/useGetTrendingHighLight";
import Destination from "./Destination";
import styles from "./style.module.css";

const TrendingDestinations = () => {
  const { data: trendingDestinations, isLoading } = useGetTrendingHighLight();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.TrendingDestinationsContainer}>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Trending Destinations
      </h2>
      <Grid container spacing={2}>
        {trendingDestinations?.map((destination) => (
          <Grid item key={destination.cityId} xs={12} sm={6} md={4}>
            <Destination destination={destination} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TrendingDestinations;
