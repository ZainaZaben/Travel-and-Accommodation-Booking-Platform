import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import useLogin from "../hook/useLogin";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store";
import { initialStateType } from "@/features/authSlice";
import { UserRole } from "@/constant/auth";
import "../style.css";

const LoginForm: React.FC = () => {
  const { userType } = useAppSelector<initialStateType>((state) => state.auth);
  const { formik, isPending } = useLogin();
  const location = useLocation();

  return (
    <>
      {userType ? (
        <Navigate
        to={userType === UserRole.Admin ? "/manageCities" : "/"}
        replace
        state={{ from: location.pathname }}
      />
      ) : (
        <Container component={"div"} maxWidth="xs" className="login-root">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#0597bf",
                textAlign: "center",
                mb: 2,
                fontSize: "2.4rem",
              }}
            >
              Musafir
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="userName"
              autoComplete="email"
              autoFocus
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "rgba(5,151,191,255)",
                "&:hover": {
                  backgroundColor: "rgba(5,151,191,200)",
                },
              }}
            >
              {isPending ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </form>
        </Container>
      )}
    </>
  );
};

export default LoginForm;
