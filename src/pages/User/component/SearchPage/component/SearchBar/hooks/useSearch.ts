import useSnackbar from "@/hooks/useSnackbar";
import dayjs from "dayjs";

const useSearch= ()=>{
    const { showSnackbar } = useSnackbar();
    
     const handleDateLogic = (newDate: { startDate: string; endDate: string }, currentDate: string) => {
        const formattedCheckInDate = dayjs(newDate.startDate).format("YYYY-MM-DD");
        const formattedCheckOutDate = dayjs(newDate.endDate).format("YYYY-MM-DD");
    
        if (
          formattedCheckInDate < currentDate ||
          formattedCheckOutDate < currentDate
        ) {
          showSnackbar({
            message: "Whoops! Check-in date or check-out date cannot be in the past.",
            severity: "error",
          });
        }
    
        const newCheckInDate =
          formattedCheckInDate < currentDate ? currentDate : formattedCheckInDate;
    
        const newCheckOutDate =
          formattedCheckOutDate <= currentDate
            ? dayjs(currentDate).add(1, "day").format("YYYY-MM-DD")
            : formattedCheckOutDate === formattedCheckInDate
            ? dayjs(formattedCheckInDate).add(1, "day").format("YYYY-MM-DD")
            : formattedCheckOutDate;
    
        return { newCheckInDate, newCheckOutDate };
      };
    
      return {handleDateLogic};
}

export default useSearch;