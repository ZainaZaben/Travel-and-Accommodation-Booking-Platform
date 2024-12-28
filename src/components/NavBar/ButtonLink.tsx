import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  to: string;
  icon: JSX.Element;
  text?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, icon, text }) => (
  <Button component={Link} to={to} color="inherit" sx={{ marginRight: 2 }}>
    {icon}
    {text && (
      <Typography
        variant="body1"
        sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
      >
        {text}
      </Typography>
    )}
  </Button>
);

export default ButtonLink;
