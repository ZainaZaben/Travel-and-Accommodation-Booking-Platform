import loginImg from "@/assets/login.jpg";
import { Card, Container, Grid, Stack } from "@mui/material";
import LoginForm from "./component/LoginForm";
import React from "react";

const LoginPage:React.FC = () => {
  return (
    <Container
      sx={{ py: { xs: 4, sm: 8 }, maxWidth: { lg: 1400 }, height: "100vh" }}
    >
      <Grid
        container
        height="100%"
        borderRadius={"10px"}
        sx={{ overflow: "hidden" }}
        className="grid"
      >
        <Grid item xs={12} md={6}>
          <Stack
            justifyContent="center"
            alignItems="center"
            height="100%"
            sx={{ bgcolor: "rgba(5,151,191,255)" }}
          >
            <Card
              sx={{
                p: 4,
                pt: 7,
                m: 2,
                mb: 13,
                maxWidth: "70%",
                borderRadius: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "50%",
              }}
            >
              <LoginForm />
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} className="login-image">
          <Card
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              height: "100%",
            }}
          >
            <Stack justifyContent="center" alignItems="center" height="100%">
              <img src={loginImg} alt="booking" width="100%" />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
