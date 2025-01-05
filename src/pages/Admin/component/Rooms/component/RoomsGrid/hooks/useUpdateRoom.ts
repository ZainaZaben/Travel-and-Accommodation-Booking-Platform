import { UpdateRoom } from "../api";
import { useMutation } from "@tanstack/react-query";
import useSnackbar from "@/hooks/useSnackbar";


export default function useUpdateRoom() {
  const { showSnackbar } = useSnackbar();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: UpdateRoom,
    onSuccess: () => {
      showSnackbar({ severity: "success", message: "success Update room" });
    },
    onError: () => {
      showSnackbar({
        severity: "error",
        message: "Error Update room",
      });
    },
  });

  return { updateRoom: mutate, isLoading: isPending, error: isError };
}
