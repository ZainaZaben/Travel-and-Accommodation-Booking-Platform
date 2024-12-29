/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from "./style.module.css";
import dayjs from "dayjs";
import { Button } from "@mui/material";

interface DateValues {
  checkInDate: string;
  checkOutDate: string;
}

interface DateCheckProps {
  handleSetDate: (newDate: any) => void;
  isDateOpened: boolean;
  toggleDate: () => void;
  dateValues: DateValues;
}

const DateCheck: React.FC<DateCheckProps> = ({ handleSetDate, isDateOpened, toggleDate, dateValues }) => {
  const [date, setDate] = useState([
    {
      startDate: dayjs(dateValues.checkInDate).toDate(),
      endDate: dayjs(dateValues.checkOutDate).toDate(),
      key: "selection",
    },
  ]);

  const handleChangeDate = (newDate: any) => {
    try {
      setDate([newDate.selection]);
      handleSetDate(newDate.selection);
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  return (
    <>
      <Button
        type="button"
        className={styles.IntroSearchText}
        onClick={toggleDate}
      >
        <DateRangeIcon className={styles.IntroIcon} />
        <span>
          {`${dayjs(date[0].startDate).format("YYYY-MM-DD")} - ${dayjs(
            date[0].endDate
          ).format("YYYY-MM-DD")}`}
        </span>
      </Button>

      {isDateOpened && (
        <DateRange
          editableDateInputs={true}
          onChange={(newDate) => handleChangeDate(newDate)}
          moveRangeOnFirstSelection={false}
          ranges={date}
          className={styles.datePicker}
        />
      )}
    </>
  );
};

export default DateCheck;
