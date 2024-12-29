// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Lottie from "lottie-react";
// import styles from "./style.module.css";
// import SearchResultItem from "../SearchResultItem";
// import { Link } from "react-router-dom";
// import { searchRes } from "@/pages/User/component/SearchPage/api";
// import { setRooms } from "@/features/searchSlice";
// import { propsType } from "@/pages/User/component/SearchPage/types";
// import useSnackbar from "@/hooks/useSnackbar";
// import loaderAnimation from "@/lotties/infinity-loader.json";
// import { useAppSelector } from "@/store";

// interface Filters {
//   [key: string]: any;
// }

// interface SearchResultProps {
//   filters: Filters;
// }

// const SearchResult: React.FC<SearchResultProps> = ({ filters }) => {
//   const dispatch = useDispatch();
//   const { showSnackbar } = useSnackbar();

//   const { data, hotelData } = useAppSelector((state) => state.search);
//   const [filteredResults, setFilteredResults] = useState<propsType[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchResults = useCallback(async () => {
//     if (!data) return;

//     setIsLoading(true);
//     try {
//       const fetchedResults = await searchRes(data);
//       dispatch(setRooms(fetchedResults));
//     } catch (err) {
//       console.error(err);
//       showSnackbar({
//         message: "Failed to fetch the results. Please try again later.",
//         severity: "error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [data, dispatch, showSnackbar]);

//   useEffect(() => {
//     fetchResults();
//   }, [fetchResults]);

//   useEffect(() => {
//     if (!hotelData) return;

//     const applyFiltersAndSort = () => {
//       const filtered = hotelData.filter((item) => {
//         if (
//           filters.starRating &&
//           item.starRating !== parseInt(filters.starRating)
//         ) {
//           return false;
//         }

//         if (filters.roomType && item.roomType !== filters.roomType) {
//           return false;
//         }

//         if (
//           filters.priceRange &&
//           (item.roomPrice < filters.priceRange[0] ||
//             item.roomPrice > filters.priceRange[1])
//         ) {
//           return false;
//         }

//         if (
//           filters.amenities &&
//           filters.amenities.length > 0 &&
//           !filters.amenities.some((filterAmenity) =>
//             item.amenities.some((amenity) => amenity.name === filterAmenity)
//           )
//         ) {
//           return false;
//         }

//         return true;
//       });

//       setFilteredResults(filtered);
//     };

//     applyFiltersAndSort();
//   }, [filters, hotelData]);

//   return (
//     <div className={styles.resultList}>
//       {isLoading ? (
//         <Lottie animationData={loaderAnimation} loop className={styles.loader} />
//       ) : filteredResults.length > 0 ? (
//         filteredResults.map((hotel) => (
//           <Link
//             to={`/hotel/${hotel.hotelId}`}
//             key={hotel.hotelId}
//             style={{ textDecoration: "none" }}
//           >
//             <SearchResultItem key={hotel.hotelId} hotel={hotel} />
//           </Link>
//         ))
//       ) : (
//         <p className={styles.noHotelsMessage}>
//           No hotels available for the selected criteria. Please refine your
//           search parameters and try again.
//         </p>
//       )}
//     </div>
//   );
// };

// export default SearchResult;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Lottie from "lottie-react";
import styles from "./style.module.css";
import SearchResultItem from "../SearchResultItem";
import { Link } from "react-router-dom";
import { searchRes } from "@/pages/User/component/SearchPage/api";
import { setRooms } from "@/features/searchSlice";
import { propsType } from "@/pages/User/component/SearchPage/types"; 
import useSnackbar from "@/hooks/useSnackbar";
import loaderAnimation from "@/lotties/infinity-loader.json";
import { useAppSelector } from "@/store";

interface Filters {
  [key: string]: any;
}

interface SearchResultProps {
  filters: Filters;
}

const SearchResult: React.FC<SearchResultProps> = ({ filters }) => {
  const dispatch = useDispatch();
  const { showSnackbar} = useSnackbar();
  
  const { data, rooms } = useAppSelector((state) => state.search); 
  const [filteredResults, setFilteredResults] = useState<propsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchResults = useCallback( async () => {
    console.log(data);
    if (!data) return;

    setIsLoading(true);
    try {
      const fetchedResults = await searchRes(data); 
      dispatch(setRooms(fetchedResults)); 
    } catch (err) {
      console.error(err); 
      showSnackbar({
        message: "Failed to fetch the results. Please try again later.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  },[]);
  
  useEffect(() => {
    
  
    fetchResults();
  }, [filters]);

  useEffect(() => {
    if (!filteredResults) return;

    const applyFiltersAndSort = () => {

      // const filteredResults = rooms.filter((item) => {
      //   if (
      //     filters.starRating &&
      //     item.starRating !== parseInt(filters.starRating)
      //   ) {
      //     return false;
      //   }

      //   if (filters.roomType && item.roomType !== filters.roomType) {
      //     return false;
      //   }

      //   if (
      //     filters.priceRange &&
      //     (item.roomPrice < filters.priceRange[0] ||
      //       item.roomPrice > filters.priceRange[1])
      //   ) {
      //     return false;
      //   }

      //   if (
      //     filters.amenities &&
      //     filters.amenities.length > 0 &&
      //     !filters.amenities.some((filterAmenity) =>
      //       item.amenities.some((amenity) => amenity.name === filterAmenity)
      //     )
      //   ) {
      //     return false;
      //   }

      //   return true;
      // });

      // if (filters.sort) {
      //   filteredResults.sort((a, b) =>
      //     filters.sort === "Price"
      //       ? a.roomPrice - b.roomPrice
      //       : b.starRating - a.starRating
      //   );
      // }
      setFilteredResults(rooms);
      // setRooms(filteredResults);
    };

    applyFiltersAndSort();
  }, []); 

  return (
    <div className={styles.resultList}>
      {isLoading ? (
        <Lottie animationData={loaderAnimation} loop className={styles.loader} />
      ) : filteredResults.length > 0 ? (
        filteredResults.map((hotel) => (
            <Link
              to={`/hotel/${hotel.hotelId}`}
              key={hotel.hotelId}
              style={{ textDecoration: "none" }}
            >
              <SearchResultItem key={hotel.hotelId} hotel={hotel} />
            </Link>
          ))
      ) : (
        <p className={styles.noHotelsMessage}>
          No hotels available for the selected criteria. Please refine your
          search parameters and try again.
        </p>
      )}

    </div>
  );
};

export default SearchResult;