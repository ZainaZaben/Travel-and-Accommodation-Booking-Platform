import axiosInstance from "@/api";
import { querySearchRequest } from "./reuest.dto";
import { propsType } from "../types";
export const searchRes = async (param: querySearchRequest | null) => {
  const url = "/home/search";
  return axiosInstance
    .get<propsType[]>(url, {
      params: param,
    })
    .then((response) => response.data);
};
