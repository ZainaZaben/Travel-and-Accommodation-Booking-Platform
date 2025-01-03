import { useState } from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DateCheck from "../DateCheck";
import OptionItem from "../OptionItem";
import { SearchContainer } from "./styles";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "@/features/searchSlice";
import SearchItemContainer from "../SearchItemContainer";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useSnackbar from "@/hooks/useSnackbar";
import { dataTypes } from "@/pages/User/types"; 

interface SearchBarProps {
  onFilter?: (filters: dataTypes) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilter }) => {
  const { showSnackbar } = useSnackbar();
  const [searchState, setSearchState] = useState({
    isOptionsOpened: false,
    isDateOpened: false,
  });
  const { isOptionsOpened, isDateOpened } = searchState;

 
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDateLogic = (newDate: { startDate: string; endDate: string }, currentDate: string) => {
    const formattedCheckInDate = dayjs(newDate.startDate).format("YYYY-MM-DD");
    const formattedCheckOutDate = dayjs(newDate.endDate).format("YYYY-MM-DD");

    if (
      formattedCheckInDate < currentDate ||
      formattedCheckOutDate < currentDate
    ) {
      showSnackbar({
        message: "Whoops! Check-in date or check-out date cannot be in the past.",
        severity: "error",
      });
    }

    const newCheckInDate =
      formattedCheckInDate < currentDate ? currentDate : formattedCheckInDate;

    const newCheckOutDate =
      formattedCheckOutDate <= currentDate
        ? dayjs(currentDate).add(1, "day").format("YYYY-MM-DD")
        : formattedCheckOutDate === formattedCheckInDate
        ? dayjs(formattedCheckInDate).add(1, "day").format("YYYY-MM-DD")
        : formattedCheckOutDate;

    return { newCheckInDate, newCheckOutDate };
  };

  const handleSetDate = (newDate: { startDate: string; endDate: string }) => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const { newCheckInDate, newCheckOutDate } = handleDateLogic(
      newDate,
      currentDate
    );

    formik.setFieldValue("checkInDate", newCheckInDate);
    formik.setFieldValue("checkOutDate", newCheckOutDate);
    dispatch(
      setData({
        city: formik.values.city,
        checkInDate: newCheckInDate,
        checkOutDate: newCheckOutDate,
        adults: formik.values.adults,
        children: formik.values.children,
        numberOfRooms: formik.values.numberOfRooms,
      })
    );
  };

  const handleToggleState = (stateKey: "isOptionsOpened" | "isDateOpened") => {
    setSearchState((prevState) => ({
      ...prevState,
      [stateKey]: !prevState[stateKey],
    }));
  };

  const handleCloseSearchState = () => {
    setSearchState({
      isOptionsOpened: false,
      isDateOpened: false,
    });
  };

  const adjustValue = (option: string, increment: boolean) => {
    const oldValue = formik.values[option];
    const newValue = increment ? oldValue + 1 : oldValue - 1;
    formik.setFieldValue(option, newValue);
  };

  const formik = useFormik({
    initialValues: {
      city: searchParams.get("city") || "",
      checkInDate:
        searchParams.get("checkInDate") || dayjs().format("YYYY-MM-DD"),
      checkOutDate:
        searchParams.get("checkOutDate") ||
        dayjs().add(1, "day").format("YYYY-MM-DD"),
      adults: parseInt(searchParams.get("adults") || "2", 10),
      children: parseInt(searchParams.get("children") || "0", 10),
      numberOfRooms: parseInt(searchParams.get("numberOfRooms") || "1", 10),
    },
    
    onSubmit: (values) => {
      const newSearchParams = new URLSearchParams(
        Object.entries({
          city: values.city,
          checkInDate: values.checkInDate,
          checkOutDate: values.checkOutDate,
          adults: values.adults.toString(),
          children: values.children.toString(),
          numberOfRooms: values.numberOfRooms.toString(),
        })
      );

      setSearchParams(newSearchParams);

      dispatch(
        setData({
          city: values.city,
          checkInDate: values.checkInDate,
          checkOutDate: values.checkOutDate,
          adults: values.adults,
          children: values.children,
          numberOfRooms: values.numberOfRooms,
        })
      );
      onFilter({
        city: values.city,
          checkInDate: values.checkInDate,
          checkOutDate: values.checkOutDate,
          adults: values.adults,
          children: values.children,
          numberOfRooms: values.numberOfRooms,
      });
      navigate("/search?" + newSearchParams.toString());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className={styles.parent}>
        <SearchContainer>
          <SearchItemContainer>
            <SingleBedIcon className={styles.searchIcon} />
            <input
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              placeholder="Where are you going?"
              className={styles.searchInput}
            />
          </SearchItemContainer>

          <SearchItemContainer>
            <DateCheck
              dateValues={{
                checkInDate: formik.values.checkInDate,
                checkOutDate: formik.values.checkOutDate,
              }}
              handleSetDate={handleSetDate}
              isDateOpened={isDateOpened}
              toggleDate={() => handleToggleState("isDateOpened")}
            />
          </SearchItemContainer>

          <SearchItemContainer>
            <Button
              type="button"
              className={styles.searchText}
              onClick={() => handleToggleState("isOptionsOpened")}
            >
              <PersonOutlineIcon className={styles.searchIcon} />
              <span>{`${formik.values.adults}  
                      ${formik.values.adults > 1 ? "adults . " : "adult . "}
                      ${formik.values.children}  
                      ${formik.values.children === 1 ? "child . " : "children . "}
                      ${formik.values.numberOfRooms}  
                      ${formik.values.numberOfRooms > 1 ? "rooms" : "room"}`}</span>
            </Button>

            {isOptionsOpened && (
              <div className={styles.options}>
                {[
                  { label: "Adults", option: "adults", min: 1 },
                  { label: "Children", option: "children", min: 0 },
                  { label: "Rooms", option: "numberOfRooms", min: 1 },
                ].map(({ label, option, min }) => (
                  <OptionItem
                    key={option}
                    label={label}
                    count={formik.values[option]}
                    min={min}
                    onIncrement={() => adjustValue(option, true)}
                    onDecrement={() => adjustValue(option, false)}
                  />
                ))}
              </div>
            )}
          </SearchItemContainer>

          <SearchItemContainer>
            <Button
              type="submit"
              className={styles.searchButton}
              onClick={handleCloseSearchState}
            >
              <SearchIcon className={styles.searchIcon} />
              Search
            </Button>
          </SearchItemContainer>
        </SearchContainer>
      </div>
    </form>
  );
};

export default SearchBar;
