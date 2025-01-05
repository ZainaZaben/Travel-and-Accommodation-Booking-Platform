import React, { useRef } from "react";
import NavBar from "@/components/NavBar";
import styles from "./style.module.css";
import ConfirmationTable from "./components/ConfirmationTable";
import Footer from "@/components/Footer";

const Confirmation: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar />
      <div className={styles.confirmationContainer} ref={componentRef}>
        <ConfirmationTable />
      </div>
      <Footer />
    </>
  );
};

export default Confirmation;
