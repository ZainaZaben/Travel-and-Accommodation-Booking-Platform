import { Response } from "./api/types";
import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useDebounce from "@/hooks/useDebounse";
import { Search } from "@/pages/Admin/types";
import useAdmin from "@/pages/Admin/context/useAdmin";
import TableBody from "./TableBody";
import UpdateCityForm from "./EditCityForm";
import { Box } from "@mui/material";

export default function DenseTable() {
  const { Params } = useAdmin();
  const debouncedSearchValue: Search | null = useDebounce<Search>(Params, 1000);

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState<Response | null>(null);

  const handleRowClick = (city: Response) => {
    setSelectedCity(city);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedCity(null);

    const openButton = document.querySelector(
      "#open-drawer-button"
    ) as HTMLElement;
    if (openButton) {
      openButton.focus();
    }
  };

  React.useEffect(() => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.inert = isDrawerOpen;
    }
    return () => {
      if (mainContent) {
        mainContent.inert = false;
      }
    };
  }, [isDrawerOpen, Params]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell
                align="center"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                Description
              </TableCell>
              <TableCell align="center">#Hotels</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            searchTerm={debouncedSearchValue}
            onRowClick={handleRowClick}
          />
        </Table>
      </TableContainer>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        variant="persistent"
        sx={{ width: 400 }}
        disableEnforceFocus
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
          <UpdateCityForm
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            entityData={selectedCity}
          />
        </Box>
      </Drawer>
    </>
  );
}
