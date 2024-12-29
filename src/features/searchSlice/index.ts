import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataTypes, filter } from "@/pages/User/types";
import { extractDate, extractTomorowDate } from "@/utilties/extractDate";
import { roomType } from "@/pages/User/component/SearchPage/component/SearchBar/types";
// import { propsType } from "@/pages/User/component/SearchPage/types";

interface SearchState {
  data: dataTypes | null;
  searchData: filter | null;
  // hotelData: propsType[]| null;
  rooms: roomType[] | null;
}

const initialState: SearchState = {
  data: {
    city: "",
    adults: 2,
    numberOfRooms: 1,
    children: 0,
    checkInDate: extractDate(),
    checkOutDate: extractTomorowDate(),
  },
  searchData: {
    priceRange: [0, 10000],
    starRating: 0,
    amenities: "",
    roomType: "Luxury",
  },
  rooms: undefined,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<dataTypes | null>) {
      state.data = action.payload;
    },
    setSearchData(state, action: PayloadAction<filter | null>) {
      state.searchData = action.payload;
    },
    setRooms(state, action: PayloadAction<roomType[] | undefined>) {
      state.rooms = action.payload;
    },
  },
});

export const { setData, setSearchData, setRooms } = searchSlice.actions;
export default searchSlice.reducer;