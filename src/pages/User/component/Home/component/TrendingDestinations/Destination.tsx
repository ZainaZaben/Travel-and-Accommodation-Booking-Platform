import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { FC } from "react";
import Flag from "react-world-flags";
import styles from "./style.module.css";
import { Response } from "./api/types";

countries.registerLocale(enLocale);

interface mediaProps {
  destination: Response;
}

const Destination: FC<mediaProps> = ({ destination }) => {
  const { cityName, thumbnailUrl, countryName } = destination;

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Trending Destination image"
          height="300"
          image={thumbnailUrl}
        />
        <CardContent className={styles.destinationCardContent}>
          <Typography variant="h5" component="h3" color="white">
            {cityName}
          </Typography>
          <Flag
            code={countries.getAlpha2Code(countryName, "en")}
            className={styles.flag}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Destination;
