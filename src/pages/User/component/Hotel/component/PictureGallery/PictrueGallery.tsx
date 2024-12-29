import { Paper } from "@mui/material";
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import usePictureGallery from "./hooks/useGetPictureGallry";
import Loader from "@/container/Loader";

interface PictureProps {
  id: string | undefined;
}

const PictureGallery: React.FC<PictureProps> = ({ id }) => {
  const { data, isLoading } = usePictureGallery(id);

  if (isLoading) return <Loader />;

  return (
    <Paper>
      {data ? (
        <ImageList
          sx={{
            width: "100%",
            height: "auto",
            overflow: "hidden",
          }}
          cols={3}
          gap={8} 
        >
          {data.map((item, indx) =>
            indx === 0 ? null : (
              <ImageListItem
                key={indx}
              >
                <img
                  src={item.url}
                  alt={`Image ${indx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px", 
                  }}
                  loading="lazy"
                />
              </ImageListItem>
            )
          )}
        </ImageList>
      ) : null}
    </Paper>
  );
};

export default PictureGallery;
