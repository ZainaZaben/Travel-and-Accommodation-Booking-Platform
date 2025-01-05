import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import Delete from "@mui/icons-material/Delete";

import useGetRoom from "./hooks/useGetRoom";
import useDeleteRoom from "./hooks/useDeleteRoom";
import { RoomResponse } from "./api/types";
import EditRoomForm from "./EditRoomForm";
import { ChevronRightIcon } from "lucide-react";
import useSearch from "@/pages/Admin/context/useAdmin";
import { useEffect } from "react";
interface Props {
  id: number;
  name: string;
  starRating: number;
  handleOpen: (id: number) => void;
}

const RoomGrid: React.FC<Props> = ({ id, name, starRating, handleOpen }) => {
  const { data } = useGetRoom(id);
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<RoomResponse>(null);
  const { mutate } = useDeleteRoom();
  const { rooms, setRooms } = useSearch();
  const handleDrawerOpen = (room: RoomResponse) => {
    setSelectedRoom(room);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRoom(null);

    const openButton = document.querySelector(
      "#open-drawer-button"
    ) as HTMLElement;
    if (openButton) {
      openButton.focus();
    }
  };

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data, setRooms]);

  return (
    <>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="center">
            <Rating value={starRating} readOnly />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Box
                  sx={{
                    padding: ".5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #eeee",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {name}
                  </Typography>
                  <Button variant="contained" onClick={() => handleOpen(id)}>
                    Create New Room
                  </Button>
                </Box>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Room Number</TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        Room Type
                      </TableCell>
                      <TableCell align="center">($) Price</TableCell>
                      <TableCell align="center">Availability</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms?.map((room) => (
                      <TableRow
                        key={room.roomId}
                        hover
                        onClick={() => handleDrawerOpen(room)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell component="th" scope="row">
                          {room.roomNumber}
                        </TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {room.roomType}
                        </TableCell>
                        <TableCell align="center">${room.price}</TableCell>
                        <TableCell align="center">
                          {room.availability ? (
                            <CloseIcon color="error" />
                          ) : (
                            <DownloadDoneIcon color="success" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={(event) => {
                              event.stopPropagation();
                              mutate({ hotelId: id, roomId: room.roomId });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{ width: 300 }}
      >
        <Box
          sx={{ width: 250, display: "flex", flexDirection: "column" }}
          role="presentation"
        >
          <IconButton
            onClick={handleCloseDrawer}
            sx={{ alignSelf: "flex-end" }}
          >
            <ChevronRightIcon />
          </IconButton>
          <EditRoomForm
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            entityData={selectedRoom}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default RoomGrid;
