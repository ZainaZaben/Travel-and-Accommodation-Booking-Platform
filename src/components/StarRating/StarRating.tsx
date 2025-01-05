import { FC } from "react";
import { Star } from "@mui/icons-material";

interface StarRatingProps {
  starsNumber: number;
  className?: string;
}

const StarRating: FC<StarRatingProps> = ({ starsNumber, className }) => {
  return (
    <div className={className} style={{ display: "flex" }}>
      {Array(starsNumber)
        .fill(null)
        .map((_, i) => (
          <Star key={i} sx={{ color: "#e6b219" }} />
        ))}
    </div>
  );
};

export default StarRating;
