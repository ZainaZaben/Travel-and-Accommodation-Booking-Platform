import React from "react";
import useGetNumberHotels from "./hooks/useGetNumberHotels";
import { CloseOutlined } from "@mui/icons-material";

interface Props {
  id: number | null;
}

const NumberOfHotel: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetNumberHotels(id);

  if (isLoading) return <>Loading...</>;
  if (!data)
    return (
      <CloseOutlined color="error" sx={{ margin: "0px", padding: "0px" }} />
    );
  return <>{data}</>;
};

export default NumberOfHotel;
