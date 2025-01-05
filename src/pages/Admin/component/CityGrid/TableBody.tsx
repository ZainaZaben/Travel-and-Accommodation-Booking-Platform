import React, { useCallback, useEffect } from "react";
import {
  TableRow,
  TableBody as Body,
  TableCell,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import { Search } from "../../types";
import { searchCity } from "./api";
import useDeleteCity from "./component/hooks/useDeleteCity";
import NumberOfHotel from "./component/NumberOfHotel";
import useSearch from "@/pages/Admin/context/useAdmin";
interface BodyProps {
  searchTerm: Search | null;
  onRowClick: (city: { id: number; name: string; description: string }) => void;
}

const TableBody: React.FC<BodyProps> = ({ searchTerm, onRowClick }) => {
  const { data } = useSWR(searchTerm, searchCity);
  const { cities, setCities } = useSearch();
  const { mutate } = useDeleteCity();

  const handleDelete = useCallback(
    (id: number) => {
      mutate(id);
      setCities(cities?.filter((city) => city.id !== id));
    },
    [mutate, cities, setCities]
  );

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data, setCities]);

  return (
    <Body>
      {cities?.map((row) => (
        <TableRow
          key={row.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          onClick={() => {
            onRowClick(row);
          }}
          style={{ cursor: "pointer" }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell
            align="center"
            sx={{ display: { xs: "none", md: "table-cell" } }}
          >
            {row.description}
          </TableCell>
          <TableCell align="center">
            <NumberOfHotel id={row.id} />
          </TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </Body>
  );
};

export default TableBody;
