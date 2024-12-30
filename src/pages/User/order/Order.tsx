import {
  Alert,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/features/cartSlice";
import RoomList from "./component/ProductListItem/RoomList";
import NavBar from "@/components/NavBar";
import colors from "@/constant/colorConstants";
import FormInformation from "./component/FormInformation";
import './style.css';
import Footer from "@/components/Footer";

const Order = () => {
  const { rooms } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemove = (roomId: number) => {
    dispatch(removeFromCart({ roomId }));
  };
  const totalAmount = rooms.reduce((accumulator, room) => {
    const { quantity, price } = room;
    return accumulator + quantity * price;
  }, 0);

  return (
    <>
      <NavBar />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            gap: "2rem", 
          }}
          mt={3}
        >
          {/* Left side: Order details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Orders Details
            </Typography>
            <Button sx={{ color: colors.primaryColor, border: "solid 1px" }}>
              Total Price: ${totalAmount}
            </Button>
            {rooms.length ? (
              <RoomList handleRemove={handleRemove} />
            ) : (
              <Alert
                severity="error"
                sx={{
                  margin: "1rem 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Please Add Item To Your Cart!&#128516;
              </Alert>
            )}
          </Box>

          {/* Right side: Form Information */}
          <Box
            sx={{
              flex: 1,
              borderLeft: {
                xs: "none", 
                sm: "1px solid #ddd", 
              },
              paddingLeft: {
                xs: "0", 
                sm: "2rem", 
              },
            }}
          >
            <FormInformation />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Order;
