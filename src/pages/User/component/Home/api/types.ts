import { BaseResponse } from "@/types";
interface AmenType{
  name:string;
  description:string;
}
export interface Response extends BaseResponse {
 hotelName: string;
  location:string;
  description:string;
  latitude:number;
  longitude: number;
  amenities:AmenType[],
  starRating: number;
  availableRooms: 50,
  imageUrl: string;
  cityId:number
}
