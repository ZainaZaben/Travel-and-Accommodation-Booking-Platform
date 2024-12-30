import { roomType } from "@/pages/User/component/Hotel/component/AvailbleRooms/types";
export interface CartItemProps {
  room: roomType;
}

export interface PaymentMethod {
  name: string;
  value: string;
}