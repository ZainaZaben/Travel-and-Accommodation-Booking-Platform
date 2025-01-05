import React from "react";
import styles from "./style.module.css";
import StarRating from "@/components/StarRating";
import { useNavigate } from "react-router-dom";
import useGetHotel from "../../hooks/useGetHotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Deal {
  hotelId: number;
  roomPhotoUrl: string;
  hotelName: string;
  cityName: string;
  hotelStarRating: number;
  originalRoomPrice: number;
  finalPrice: number;
}

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetHotel(deal.hotelId.toString());

  const handleDealClick = () => {
    if (!isLoading && data) {
      navigate(`/hotel/${deal.hotelId}`);
    } else {
      console.error("Error fetching hotel details:", error);
    }
  };

  return (
    <div onClick={handleDealClick} className={styles.dealCard}>
      <img className={styles.roomPhoto} src={deal.roomPhotoUrl} alt={deal.hotelName} />
      <div className={styles.bottomContainer}>
        <div className={styles.topSpaceBetweenContainer}>
          <h3 className={styles.hotelName}>{deal.hotelName}</h3>
          <StarRating starsNumber={deal.hotelStarRating} />
        </div>
        <div className={styles.bottomSpaceBetweenContainer}>
          <p className={styles.cityName}>
            <LocationOnIcon
              sx={{ color: "#3d3737", fontSize: "1.2rem", marginRight: 0.5 }}
            />
            {deal.cityName}
          </p>
          <div className={styles.priceInfoContainer}>
            <p className={styles.originalPrice}>${deal.originalRoomPrice}</p>
            <p className={styles.finalPrice}>${deal.finalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
