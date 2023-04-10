import React from "react";
import { Grid, Typography, Button } from "@mui/material";

let log: string;

const LoginWithGoogleOrFacebookComponent = () => {
  return (
    <>
      {log == "Login" ? null : (
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Sign up with :
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Button
              sx={{
                width: "100%",
              }}
              variant="outlined"
              color="secondary"
            >
              {" "}
              Google
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{
                width: "100%",
              }}
              variant="contained"
              color="primary"
            >
              Facebook
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LoginWithGoogleOrFacebookComponent;
