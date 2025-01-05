import React from "react";
import { ModalType, Search, types } from "@/pages/Admin/types";
import useSWR from "swr";
import { searchCity } from "@/pages/Admin/component/CityGrid/api";
import SlidingWindowForm from "@/pages/Admin/component/Hotels/component/CreateHotel/Modal";
import useUpdateHotel from "./hook/useUpdateHotel";
const searchTerm: Search = { name: "", searchQuery: "" };
interface modalProps {
  handleClose: () => void;
  open: ModalType;
}
const UpdateHotel: React.FC<modalProps> = ({ handleClose, open }) => {
  const { data } = useSWR(searchTerm, searchCity);
  const { formik, isPending } = useUpdateHotel();
  return (
    <>
      <SlidingWindowForm
        data={data}
        isPending={isPending}
        formik={formik}
        type={types.EDIT}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default UpdateHotel;
