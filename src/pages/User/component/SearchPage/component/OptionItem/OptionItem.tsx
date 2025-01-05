import { Button } from "@mui/material";
import styles from "./style.module.css";
import React from "react";

interface OptionItemProps {
  label: string;
  min: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  label,
  min,
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className={styles.optionItem}>
      <span className={styles.optionText}>{label}</span>
      <div className={styles.optionCounter}>
        <Button
          type="button"
          disabled={count <= min}
          className={styles.optionCounterButton}
          onClick={onDecrement}
          aria-label={`Decrease ${label}`}
        >
          <span className={styles.sign}>&#x2212;</span>
        </Button>
        <span className={styles.optionCounterNumber}>{count}</span>
        <Button
          type="button"
          className={styles.optionCounterButton}
          onClick={onIncrement}
          aria-label={`Increase ${label}`}
        >
          <span className={styles.sign}>&#43;</span>
        </Button>
      </div>
    </div>
  );
};

export default OptionItem;
