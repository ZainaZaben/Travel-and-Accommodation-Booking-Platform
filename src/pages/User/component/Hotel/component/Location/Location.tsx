import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Paper } from "@mui/material";

import "./styles.css";

interface MapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
}

const SetView: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};

const MapComponent: React.FC<MapProps> = ({
  latitude,
  longitude,
  hotelName,
}) => {
  return (
    <Paper>
      <MapContainer
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "626px", width: "100%", padding: ".5rem" }}
      >
        <SetView center={[latitude, longitude]} zoom={13} />
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LFVSscM1KK8Mz1ygaH8t"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{hotelName}</Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default MapComponent;
