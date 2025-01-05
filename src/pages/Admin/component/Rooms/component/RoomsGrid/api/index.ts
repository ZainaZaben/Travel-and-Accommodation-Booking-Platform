import axiosInstance from "@/api";
import { RoomResponse, param } from "./types";
export const getRooms = async (id: number) => {
  const params = { checkInDate: "9-8-2002", checkOutDate: "11-11-11" };
  return await axiosInstance
    .get<RoomResponse[]>(`/hotels/${id}/rooms`, {
      params,
    })
    .then((response) => response.data);
};
export const DeleteRoom = async (params: param) => {
  return await axiosInstance
    .delete(`/hotels/${params.hotelId}/rooms/${params.roomId}`)
    .then((response) => response.data);
};

export const UpdateRoom = async (body: {
  id: number;
  roomNumber: string;
  price: number;
}) => {
  const response = await axiosInstance.put(`/rooms/${body.id}`, {
    roomNumber: body.roomNumber,
    cost: body.price,
  });
  return response.data;
};
