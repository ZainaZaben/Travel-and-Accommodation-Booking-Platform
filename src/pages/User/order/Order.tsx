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
  const dateValues = useAppSelector((state) => state.search.data);
  const totalAmount = rooms.reduce((acc) => {
    if (!dateValues?.checkInDate || !dateValues?.checkOutDate) return acc;
    
    const checkIn = new Date(dateValues.checkInDate);
    const checkOut = new Date(dateValues.checkOutDate);
    console.log(checkIn);
    console.log(checkOut);
    const daysBetween = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    console.log(acc + daysBetween);
    return (acc + daysBetween) * rooms[0]?.price;
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
