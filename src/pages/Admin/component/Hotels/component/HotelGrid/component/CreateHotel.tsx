import React from "react";
import { ModalType, Search, types } from "@/pages/Admin/types";
import useSWR from "swr";
import { searchCity } from "@/pages/Admin/component/CityGrid/api";
import useCreateHotel from "./hook/useCreateHotel";
import TransitionsModal from "@/pages/Admin/component/Hotels/component/CreateHotel/Modal";

const searchTerm: Search = { name: "", searchQuery: "" };
interface modalProps {
  handleClose: () => void;
  open: ModalType;
}
const CreateHotel: React.FC<modalProps> = ({ handleClose, open }) => {
  const { data } = useSWR("cities", () => searchCity(searchTerm));
  const { formik, isPending } = useCreateHotel();
  return (
    <>
      <TransitionsModal
        data={data}
        isPending={isPending}
        formik={formik}
        type={types.CREATE}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default CreateHotel;
