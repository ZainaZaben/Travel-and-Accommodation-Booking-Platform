import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import colors from "@/constant/colorConstants";

interface IconLink {
  icon: JSX.Element;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const iconLinks: IconLink[] = [
    {
      icon: <GitHubIcon />,
      href: "https://github.com/ZainaZaben",
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/zainazaben/",
      label: "LinkedIn",
    },
    {
      icon: <EmailIcon />,
      href: "mailto:zainarami2002@gmail.com",
      label: "Email",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: colors.primaryColor,
        color: "white",
        padding: "18px 0px 8px 0px",
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" component="p">
        Developed by Zaina Zaben
      </Typography>
      <Typography variant="body1" component="p">
        All rights reserved © {new Date().getFullYear()}
      </Typography>
      <Box
        sx={{
          marginTop: 0.5,
          display: "flex",
          gap: "0.2rem",
        }}
      >
        {iconLinks.map((link, index) => (
          <IconButton
            key={index}
            aria-label={link.label}
            component={Link}
            href={link.href}
            target="_blank"
            color="inherit"
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
