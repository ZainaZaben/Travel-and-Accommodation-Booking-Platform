import React, { createContext, FC, ReactNode, useState } from "react";
import { ModalType, Search, types } from "../types";
import { Response } from "../component/CityGrid/api/types";
import { hotel } from "../component/Hotels/component/HotelGrid/api/types";
import {RoomResponse } from "../component/Rooms/component/RoomsGrid/api/types"
interface contextValueType {
  Params: Search | null;
  setParams: React.Dispatch<React.SetStateAction<Search | null>>;
  open: ModalType;
  setOpen: React.Dispatch<React.SetStateAction<ModalType>>;
  cities: Response[];
  setCities: React.Dispatch<React.SetStateAction<Response[]>>;
  hotels: hotel[];
  setHotels: React.Dispatch<React.SetStateAction<hotel[]>>;
  rooms: RoomResponse[];
  setRooms: React.Dispatch<React.SetStateAction<RoomResponse[]>>;
}
export const AdminContext = createContext<contextValueType | null>(null);

export interface SearchProviderProps {
  children: ReactNode;
}

export const AdminProvider: FC<SearchProviderProps> = ({ children }) => {
  const [Params, setParams] = useState<Search | null>({
    name: "",
    searchQuery: "",
  });
  const [open, setOpen] = useState<ModalType>({
    open: false,
    type: types.CREATE,
  });
  const [cities, setCities] = useState<Response[]>([]);
  const [hotels, setHotels] = useState<hotel[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  return (
    <React.Fragment>
      <AdminContext.Provider
        value={{
          Params,
          setParams,
          open,
          setOpen,
          cities,
          setCities,
          hotels,
          setHotels,
          rooms,
          setRooms,
        }}
      >
        {children}
      </AdminContext.Provider>
    </React.Fragment>
  );
};
