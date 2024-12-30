export interface dataTypes {
  city: string;
  adults: number;
  numberOfRooms: number;
  children: number;
  checkInDate: string;
  checkOutDate: string;
}
export interface Filter {
  priceRange: number[];
  starRating: number;
  amenities: string[];
  roomType: string;
}

export interface HotelType {
  hotelId: number;
  hotelName: string;
  starRating: number;
  roomType: string;
  roomPrice: number;
  roomPhotoUrl: string;
  cityName: string;
  amenities: { name: string }[];
}
