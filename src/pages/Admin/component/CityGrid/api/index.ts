import axiosInstance from "@/api";
import { Search } from "@/pages/Admin/types";
import { Response, hotelResponse } from "./types";

export const searchCity = async (param: Search | null) => {
  const url = "/cities";
  return axiosInstance
    .get<Response[]>(url, {
      params: param,
    })
    .then((response) => response.data);
};

export const getHotelsNumber = async (id: number | null) => {
  return axiosInstance
    .get<hotelResponse[]>(`/cities/${id}/hotels`)
    .then((response) => response.data.length);
};

export const DeleteCity = async (id: number) => {
  return await axiosInstance
    .delete(`/cities/${id}`)
    .then((response) => response.data);
};
