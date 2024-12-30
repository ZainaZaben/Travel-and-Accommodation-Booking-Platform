/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@/store";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Button,
} from "@mui/material";
import styles from "./style.module.css";
import Logo from "@/assets/logo.png";
import { jsPDF } from "jspdf";
import { addCart, addToCart, removeCart } from "@/features/cartSlice";
import { useDispatch } from "react-redux";

const ConfirmationTable: React.FC = () => {
  const formValues = useAppSelector((state) => state.checkout.formValues);
  console.log(formValues);
  const { rooms } = useAppSelector((state) => state.cart);
  console.log(rooms);
  const searchParams = useAppSelector((state) => state.search.data);

  const totalAmount = rooms.reduce((accumulator, room) => {
    const { quantity, price } = room;
    return accumulator + quantity * price;
  }, 0);
  // const getNumberOfNights = (): number => {
  //   if (!searchParams?.checkInDate || !searchParams?.checkOutDate) return 0;
  //   const checkIn = new Date(searchParams.checkInDate);
  //   const checkOut = new Date(searchParams.checkOutDate);
  //   return Math.ceil(
  //     (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  //   );
  // };

  const fields = [
    { label: "Confirmation Number", value: "20240109-5460" },
    { label: "Full Name", value: formValues?.customerName || "N/A" },
    { label: "Email", value: formValues?.email || "N/A" },
    { label: "State", value: formValues?.state || "N/A" },
    {
      label: "Payment Method",
      value: formValues?.paymentMethod?.value || "N/A",
    },
    { label: "Check-in date", value: searchParams?.checkInDate || "N/A" },
    { label: "Check-out date", value: searchParams?.checkOutDate || "N/A" },
    { label: "Room Type", value: rooms[0]?.roomType || "N/A" },
    { label: "Room Number", value: rooms[0]?.roomNumber || "N/A" },
    {
      label: "Total Cost",
      value: `$${totalAmount}`,
    },
  ];

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (componentRef.current) {
      const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const content = componentRef.current;

      doc.setFontSize(10);

      doc.html(content, {
        callback: (doc) => {
          doc.save("confirmation_details.pdf");
        },
        margin: [20, 20, 20, 20],
        html2canvas: {
          scale: 0.3,
        },
        autoPaging: true,
      });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addCart(rooms));
    return () => {
      dispatch(removeCart());
    };
  }, [dispatch]);

  return (
    <>
      <div ref={componentRef} className={styles.confirmationDiv}>
        <Container maxWidth="md">
          <div className={styles.cartHeader}>
            <img src={Logo} alt="Musafir Logo" />
            <h1 className={styles.headerName}>Musafir</h1>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={styles.TableHeadRow}>
                  <TableCell className={styles.tableCell}>Field</TableCell>
                  <TableCell className={styles.tableCell}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? styles.TableBodyRow : ""}
                  >
                    <TableCell>{field.label}</TableCell>
                    <TableCell>{field.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button className={styles.printButton} onClick={handleDownload}>
          Download Confirmation Details
        </Button>
      </div>
    </>
  );
};

export default ConfirmationTable;
