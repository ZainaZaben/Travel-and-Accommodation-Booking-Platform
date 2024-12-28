import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { ShowSnackbarPayload } from '../../types/snackbar';

interface SnackbarState {
  open: boolean;
  severity: AlertColor;
  variant: 'filled' | 'outlined' | 'standard';
  title?: React.ReactNode;
  message: React.ReactNode;
  anchorOrigin: SnackbarOrigin;
  action: React.ReactNode;
  autoHideDuration: number | null | undefined;
  icon: React.ReactNode;
}

const initialState: SnackbarState = {
  open: false,
  severity: 'info',
  variant: 'filled',
  title: null,
  message: '',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  action: null,
  autoHideDuration: 6000,
  icon: undefined,
};

// Define the slice
const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
      state.variant = action.payload.variant || 'filled';
      state.anchorOrigin = action.payload.anchorOrigin || { vertical: 'top', horizontal: 'center' };
      state.action = action.payload.action || null;
      state.autoHideDuration = action.payload.autoHideDuration || 6000;
      state.icon = action.payload.icon || undefined;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = ''; // Clear the message
    },
  },
});

// Actions
export const { showSnackbar, hideSnackbar } = snackBarSlice.actions;

// Reducer
export default snackBarSlice.reducer;
