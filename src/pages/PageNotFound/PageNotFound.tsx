import { FC } from "react";
import { useNavigate } from "react-router-dom";
import notFound from "@/lotties/404.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import styles from "./PageNotFound.module.css";

const PageNotFound: FC = () => {
  const navigate = useNavigate();

  const backToPreviousPage = () => navigate(-1);
  const reloadPage = () => navigate(0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <Lottie animationData={notFound} />
        <Typography
          variant="h2"
          sx={{ color: "grey.700", mt: -5 }}
          fontSize={{ xs: "h4.fontSize", md: "h3.fontSize", xl: "h2.fontSize" }}
        >
          Oops! Page not found
        </Typography>
        <div className={styles.buttonContainer}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={backToPreviousPage}
            size="large"
            variant="contained"
          >
            Back
          </Button>
          <Button
            startIcon={<ReplayIcon />}
            onClick={reloadPage}
            size="large"
            variant="outlined"
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
