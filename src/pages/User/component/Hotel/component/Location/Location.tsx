import React from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface HotelMapLocationProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  location: string;
}

const HotelMapLocation: React.FC<HotelMapLocationProps> = ({
  latitude,
  longitude,
  hotelName,
  location,
}) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="mapContainer">
      <h3>See on map:</h3>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "630px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <strong>{hotelName}</strong>
            <br />
            {location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HotelMapLocation;
