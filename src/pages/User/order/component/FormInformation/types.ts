import { roomType } from "@/pages/User/component/Hotel/component/AvailbleRooms/types";
export interface CartItemProps {
  room: roomType;
}

export interface PaymentMethod {
  name: string;
  value: string;
}

export interface Booking {
  customerName: string;
  email: string;
  state: string;
  city: string;
  paymentMethod: {
    value: string,
  },
  cardNumber: string;
  expDate: string;
  CVV: string;
  notes: string;
}


export interface Confirmation {
  customerName: string;
  email: string;
  state: string;
  city: string;
  paymentMethod: {
    value: string,
  },
}