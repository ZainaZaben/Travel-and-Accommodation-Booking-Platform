import React from "react";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetHotel from "./hooks/useGetHotel";
import Lottie from "lottie-react";
import animationData from "@/lotties/infinity-loader.json";
import Location from "./component/Location";
import Details from "./component/Details";
import PictureGallery from "./component/PictureGallery";
import AvailbleRooms from "./component/AvailbleRooms";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const MyLayout: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetHotel(id);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Lottie
          animationData={animationData}
          style={{ width: "100px", height: "100px", margin: "1rem" }}
        />
      </div>
    );

  return (
    <>
      <NavBar />
      <Container sx={{ py: 10, mt: -5 }}>
        {data ? (
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={12} md={3}>
                <Details
                  id={id}
                  starRating={data.starRating}
                  city={data.location}
                  description={data.description}
                  name={data.hotelName}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <PictureGallery id={id} />
              </Grid>
            </Grid>
            <Grid container item mt={2} spacing={2}>
              <Grid item xs={12} md={3}>
                <Location
                  hotelName={data.hotelName}
                  latitude={data.latitude}
                  longitude={data.longitude}
                  location={data.location}
                />
              </Grid>
              <Grid item xs={12} md={9} spacing={2}>
                <h3>Available Rooms</h3>
                <AvailbleRooms id={id} />
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Container>
      <Footer />
    </>
  );
};

export default MyLayout;
