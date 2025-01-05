import { UpdateCity } from "../../api";
import { useMutation } from "@tanstack/react-query";
import useSnackbar from "@/hooks/useSnackbar";

export default function useUpdateCity() {
  const { showSnackbar } = useSnackbar();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: UpdateCity,
    onSuccess: () => {
      showSnackbar({ severity: "success", message: "success Update city" });
    },
    onError: () => {
      showSnackbar({
        severity: "error",
        message: "Error Update City",
      });
    },
  });

  return { updateCity: mutate, isLoading: isPending, error: isError };
}
