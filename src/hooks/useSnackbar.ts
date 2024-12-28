import { useDispatch } from 'react-redux';
import { showSnackbar, hideSnackbar } from '../features/snackbar';
import { ShowSnackbarPayload } from '../types/snackbar';
import { useAppSelector } from '../store';

const useSnackbar = () => {
  const dispatch = useDispatch();
  const state=useAppSelector(state=>state.snackBar);
  const show = (payload: ShowSnackbarPayload) => {
    dispatch(showSnackbar(payload));
  };

  const hide = () => {
    dispatch(hideSnackbar());
  };

  return { showSnackbar: show, hideSnackbar: hide, state };
};

export default useSnackbar;
