import React, { useRef } from "react";
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

const ConfirmationTable: React.FC = () => {
  const formValues = useAppSelector((state) => state.checkout.formValues);
  const cart = useAppSelector((state) => state.cart.rooms);
  const searchParams = useAppSelector((state) => state.search.data);

  const getNumberOfNights = (): number => {
    if (!searchParams?.checkInDate || !searchParams?.checkOutDate) return 0;
    const checkIn = new Date(searchParams.checkInDate);
    const checkOut = new Date(searchParams.checkOutDate);
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const fields = [
    { label: "Confirmation Number", value: "20240109-5460" },
    { label: "Full Name", value: formValues?.customerName || "N/A" },
    { label: "Email", value: formValues?.email || "N/A" },
    { label: "State", value: formValues?.state || "N/A" },
    { label: "Payment Method", value: formValues?.paymentMethod?.value || "N/A" },
    { label: "Check-in date", value: searchParams?.checkInDate || "N/A" },
    { label: "Check-out date", value: searchParams?.checkOutDate || "N/A" },
    { label: "Room Type", value: cart[0]?.roomType || "N/A" },
    { label: "Room Number", value: cart[0]?.roomNumber || "N/A" },
    {
      label: "Total Cost",
      value: `$${(cart[0]?.price || 0) * getNumberOfNights()}`,
    },
  ];

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (componentRef.current) {
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
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
