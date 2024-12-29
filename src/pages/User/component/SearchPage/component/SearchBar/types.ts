export interface roomType {
  roomPrice: number;
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  amenities: {
    name: string;
    description: string;
  }[];
  availability: boolean;
  quantity: number;
  starRating: number;
}