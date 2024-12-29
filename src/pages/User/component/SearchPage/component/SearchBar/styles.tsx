import { Box, styled } from "@mui/material";
import colors from "@/constant/colorConstants";

interface SearchContainerProps {
  position?: "absolute" | "relative" | "fixed" | "sticky";
  topXs?: string;
  topLg?: string;
}

export const SearchContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "position" && prop !== "topXs" && prop !== "topLg",
})<SearchContainerProps>(({ theme, position = "absolute", topXs, topLg }) => ({
  height: "fit-content",
  backgroundColor: "white",
  border: `1px solid ${colors.primaryColor}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  borderRadius: "10px",
  position: position,
  zIndex: "9",
  width: "90%",
  maxWidth: "1160px",
  [theme.breakpoints.up("xs")]: {
    top: topXs,
    flexDirection: "column",
    gap: "10px",
  },
  [theme.breakpoints.up("lg")]: {
    top: topLg,
    flexDirection: "row",
    gap: "none",
  },
}));
