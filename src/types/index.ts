/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
export interface BaseResponse {
  status: number;
  statusText: string;
  data: any;
}
export interface AxiosBaseError extends AxiosError<BaseResponse> {}
