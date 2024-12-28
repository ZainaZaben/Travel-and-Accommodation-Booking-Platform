import { Link } from "react-router-dom";
import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { logOut } from "@/features/authSlice";
import colors from "@/constant/colorConstants";
import ButtonLink from "./ButtonLink";

const AppBarComponent: React.FC = () => {
  const dispatch = useDispatch();
  const cart = () => dispatch(addToCart());
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
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: "1.5rem",
          }}
        >
          Musafir
        </Typography>

        <div>
          <ButtonLink to="/" icon={<HomeIcon />} text="Home" />
          <ButtonLink to="/search" icon={<SearchIcon />} text="Search" />
          <ButtonLink
            to="/cart"
            icon={
              <Badge badgeContent={cart.length} color="error">
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
