import HomeBackground from "@/assets/background.webp";
import styles from "./style.module.css";
import { Stack, Typography } from "@mui/material";

const IntroSection: React.FC = () => {
  return (
    <header className={styles.imageContainer}>
      <Stack
        spacing={2}
        sx={{
          width: { xs: "100%", sm: "100%" },
          backgroundImage: `url(${HomeBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          height: "400px",
          position: "relative",
        }}
      >
        <Typography variant="h5" className={styles.overlayText}>
          Discover the world with Musafir;
        </Typography>
      </Stack>
    </header>
  );
};

export default IntroSection;
