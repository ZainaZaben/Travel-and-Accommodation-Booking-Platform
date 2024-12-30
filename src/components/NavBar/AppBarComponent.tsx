import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/authSlice";
import colors from "@/constant/colorConstants";
import ButtonLink from "./ButtonLink";
import logo from "@/assets/whiteLogo.png";
import { useAppSelector } from "@/store";
const AppBarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.cart);
  const logoutUser = () => dispatch(logOut());

  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: colors.primaryColor }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: { sm: "3rem", md: "3rem", lg: "6rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ImageListItem sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src={logo}
              style={{ height: 40, width: 40, borderRadius: "50%" }}
              alt="logo"
            />
          </ImageListItem>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="inherit"
            sx={{
              marginTop: "10px",
              textDecoration: "none",
              fontSize: "1.8rem",
            }}
          >
            Musafir
          </Typography>
        </Box>

        <div>
          <ButtonLink to="/" icon={<HomeIcon />} text="Home" />
          <ButtonLink to="/search" icon={<SearchIcon />} text="Search" />
          <ButtonLink
            to="/order"
            icon={
              <Badge badgeContent={rooms?.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
          />
          <Button onClick={logoutUser} sx={{ color: "inherit" }}>
            <LogoutIcon />
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
            >
              Logout
            </Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
