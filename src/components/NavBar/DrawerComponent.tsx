import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/features/authSlice";

interface DrawerComponentProps {
  isMobileOpened: boolean;
  handleDrawerToggle: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isMobileOpened,
  handleDrawerToggle,
}) => {
  const dispatch = useDispatch();
  const navItems = ["Home", "Search", "Cart"];
  const navigate = useNavigate();

  const handleNavigate = (item: string) => {
    navigate(`/${item.toLowerCase()}`);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Drawer
      anchor="left"
      open={isMobileOpened}
      onClose={handleDrawerToggle}
      sx={{ "& .MuiDrawer-paper": { width: "240px" } }}
    >
      <Box>
        <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
          Musafir
        </Typography>

        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleNavigate(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton sx={{ textAlign: "center" }} onClick={handleLogout}>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;


