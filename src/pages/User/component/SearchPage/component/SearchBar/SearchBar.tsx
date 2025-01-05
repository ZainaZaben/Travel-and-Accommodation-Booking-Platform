import { useState } from "react";
import styles from "./style.module.css";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DateCheck from "../DateCheck";
import OptionItem from "../OptionItem";
import { SearchContainer } from "./styles";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setData } from "@/features/searchSlice";
import SearchItemContainer from "../SearchItemContainer";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { dataTypes } from "@/pages/User/types";
import useSearch from "./hooks/useSearch";
import useForm from "./hooks/useForm";

interface SearchBarProps {
  onFilter?: (filters: dataTypes) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilter }) => {
  const { handleDateLogic } = useSearch();
  const [searchState, setSearchState] = useState({
    isOptionsOpened: false,
    isDateOpened: false,
  });
  const { isOptionsOpened, isDateOpened } = searchState;

  const dispatch = useDispatch();

  const { formik } = useForm(onFilter);
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
                      ${
                        formik.values.children === 1
                          ? "child . "
                          : "children . "
                      }
                      ${formik.values.numberOfRooms}  
                      ${
                        formik.values.numberOfRooms > 1 ? "rooms" : "room"
                      }`}</span>
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
