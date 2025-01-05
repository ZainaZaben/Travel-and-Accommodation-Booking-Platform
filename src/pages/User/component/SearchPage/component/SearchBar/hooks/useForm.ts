import {  useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setData } from "@/features/searchSlice";
import { dataTypes } from "@/pages/User/types"; 

const useForm = (onFilter?: (filters: dataTypes) => void) =>{

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          city: searchParams.get("city") || "",
          checkInDate:
            searchParams.get("checkInDate") || dayjs().format("YYYY-MM-DD"),
          checkOutDate:
            searchParams.get("checkOutDate") ||
            dayjs().add(1, "day").format("YYYY-MM-DD"),
          adults: parseInt(searchParams.get("adults") || "2", 10),
          children: parseInt(searchParams.get("children") || "0", 10),
          numberOfRooms: parseInt(searchParams.get("numberOfRooms") || "1", 10),
        },
        
        onSubmit: (values) => {
          const newSearchParams = new URLSearchParams(
            Object.entries({
              city: values.city,
              checkInDate: values.checkInDate,
              checkOutDate: values.checkOutDate,
              adults: values.adults.toString(),
              children: values.children.toString(),
              numberOfRooms: values.numberOfRooms.toString(),
            })
          );
    
          setSearchParams(newSearchParams);
    
          dispatch(
            setData({
              city: values.city,
              checkInDate: values.checkInDate,
              checkOutDate: values.checkOutDate,
              adults: values.adults,
              children: values.children,
              numberOfRooms: values.numberOfRooms,
            })
          );
          onFilter({
            city: values.city,
              checkInDate: values.checkInDate,
              checkOutDate: values.checkOutDate,
              adults: values.adults,
              children: values.children,
              numberOfRooms: values.numberOfRooms,
          });
          navigate("/search?" + newSearchParams.toString());
        },
      });

      return {formik};
}

export default useForm;