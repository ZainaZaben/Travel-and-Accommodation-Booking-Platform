import {
  IconButton,
  ImageListItem,
  Box,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "../AppBarHeader/AppBarHeader";
import { useAppSelector } from "../../store";
import { handleToggle } from "../../features/openSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";
import logo from "@/assets/whiteLogo.png";
import colors from "@/constant/colorConstants";

const AppBarMUI: React.FC = () => {
  const { open } = useAppSelector((state) => state.open);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleToggleDrawer = () => {
    dispatch(handleToggle({ open: !open }));
  };
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: colors.primaryColor,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box margin={"0px auto"}>
            <Box
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageListItem sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={logo}
                  style={{ height: 30, width: 30, borderRadius: "50%" }}
                  alt="logo"
                />
              </ImageListItem>
              <Typography
                variant="h6"
                sx={{
                  my: 2,
                  textAlign: "center",
                  marginTop: "20px",
                  textDecoration: "none",
                  fontSize: "1.6rem",
                }}
              >
                Musafir
              </Typography>
            </Box>
          </Box>
          {token && (
            <Tooltip title="Logout">
              <IconButton sx={{ color: "white" }} onClick={handleLogout}>
                <ExitToAppIcon />
                <Typography sx={{ textAlign: "right" }} onClick={handleLogout}>
                  LOGOUT
                </Typography>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarMUI;
