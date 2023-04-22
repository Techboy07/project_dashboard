import { useState, FC, useEffect } from "react";
import { Paper, Container, Grid, Typography, Button } from "@mui/material";
import ModalComponent from "../components/ModalComponent";
import LoginAndSignUpComponent from "../components/LoginAndSignUpComponent";
import { firebase } from "../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { revokeAuthentication } from "../redux/firebase/authentication/authActions";
import { ReduxState } from "../redux";
import { useNavigate } from "react-router-dom";

const accent = "primary";
const HomePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState: boolean = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenticated;
  });
  const [mobile, setMobile] = useState({
    text: "center",
    flex: "center",
  });

  const { logOut } = firebase();

  const { text, flex } = mobile;
  const [openModal, setOpenModal] = useState(false);
  const [log, setLog] = useState("logIn");

  useEffect(() => {
    logOut(() => dispatch(revokeAuthentication()));
  }, []);

  return (
    <>
      <ModalComponent opened={openModal} close={() => setOpenModal(false)}>
        <LoginAndSignUpComponent setLog={setLog} log={log} />
      </ModalComponent>

      <Paper elevation={0}>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              textAlign: text,
            }}
          >
            <Grid container item xs={12}>
              <Typography
                variant="h5"
                color={accent}
                sx={{ fontWeight: "700", width: "100%" }}
              >
                Welcome!
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "700",
                  width: "100%",
                }}
              >
                Write anything anywhere anytime
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" color={"textSecondary"}>
                " The faintest ink is greater than the sharpest brain "
              </Typography>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sx={{
                justifyContent: flex,
              }}
            >
              <Grid item>
                {authState ? (
                  <Button
                    variant="contained"
                    sx={{
                      width: "150px",
                    }}
                    color={accent}
                    onClick={() => navigate("/notes")}
                  >
                    My notes
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      width: "150px",
                    }}
                    color={accent}
                    onClick={() => {
                      setOpenModal(true);
                      setLog("logIn");
                    }}
                  >
                    {/*!auth*/ true ? "Login" : "Logout"}
                  </Button>
                )}
              </Grid>
              <Grid item>
                {!authState && (
                  <Button
                    variant="contained"
                    color={accent}
                    sx={{
                      width: "150px",
                    }}
                    onClick={() => {
                      setOpenModal(true);
                      setLog("signUp");
                    }}
                  >
                    {"SignUp"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default HomePage;
