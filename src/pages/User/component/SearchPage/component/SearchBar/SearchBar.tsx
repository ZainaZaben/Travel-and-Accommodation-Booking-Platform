import { useState } from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DateCheck from "../DateCheck";
import OptionItem from "../OptionItem";
import { SearchContainer } from "./styles";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData, setSearchData, setRooms } from "@/features/searchSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SearchItemContainer from "../SearchItemContainer";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 

const SearchBar: React.FC = () => {
  const [searchState, setSearchState] = useState({
    isOptionsOpened: false,
    isDateOpened: false,
  });
  const { isOptionsOpened, isDateOpened } = searchState;

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "info" as "info" | "error" | "success" | "warning",
    message: "",
  });

  const showSnackbar = (severity: typeof snackbar.severity, message: string) => {
    setSnackbar({ open: true, severity, message });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
      showSnackbar("error", "Whoops! Check-in date or check-out date cannot be in the past.");
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
    if (option === "numberOfRooms") {
      dispatch(setRooms(newValue));
    }
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
      priceRange: searchParams.get("priceRange")
        ? JSON.parse(searchParams.get("priceRange") || "[]") 
        : [], 
      starRating: searchParams.get("starRating")
        ? parseInt(searchParams.get("starRating") || "0") 
        : null,
      amenities: searchParams.get("amenities") || "",
      roomType: searchParams.get("roomType") || "any",
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
          priceRange: JSON.stringify(values.priceRange),
          starRating: values.starRating?.toString() || "0", 
          amenities: values.amenities,
          roomType: values.roomType,
        })
      );
  
      setSearchParams(newSearchParams);
  
      dispatch(
        setSearchData({
          priceRange: values.priceRange, 
          starRating: values.starRating,
          amenities: values.amenities, 
          roomType: values.roomType,
        })
      );
  
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default SearchBar;
