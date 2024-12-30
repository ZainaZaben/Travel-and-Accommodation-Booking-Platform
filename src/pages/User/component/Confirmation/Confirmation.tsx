import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "@/components/NavBar";
import styles from "./style.module.css";
import ConfirmationTable from "./components/ConfirmationTable";
import Footer from "@/components/Footer";
import { removeCart } from "@/features/cartSlice";

const Confirmation: React.FC = () => {
  const dispatch = useDispatch();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      dispatch(removeCart());
    };
  }, [dispatch]);

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
