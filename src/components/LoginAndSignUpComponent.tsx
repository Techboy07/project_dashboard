import { useState, ChangeEvent, FormEvent } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux";
import { firebase } from "../firebase/firebase.config";
import { authenthicateUser } from "../redux/firebase/authentication/authActions";
import { AppDispatch } from "../redux";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  userPreferenceStateObject,
  getUserPreferenceAction,
} from "../redux/firebase/userPreference/userPreferenceAction";

const { auth, passwordReset } = firebase();

const accent = "primary";

const LoginAndSignUpComponent = ({
  log,
  setLog,
}: {
  log: string;
  setLog: Function;
}) => {
  const navigate = useNavigate();
  const isLoading: boolean = useSelector((state: ReduxState) => {
    return state.auth.loading;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const getUserPreference = () => {
    const userEmail = `${auth.currentUser?.email}`;

    const db = getFirestore();
    const docRef = collection(db, `users/${userEmail}/userPreference`);

    getDocs(docRef)
      .then((res) => {
        let box: any[] = [];
        res.docs.forEach((doc) => box.push({ ...doc.data(), id: `${doc.id}` }));
        const userObj: userPreferenceStateObject = box[0];
        return userObj;
      })
      .then((res) => dispatch(getUserPreferenceAction(res)))
      .then(() => navigate("/notes"));
  };

  const fieldInput = [
    {
      label: "Email",
      onChange(e: string) {
        setEmail(e);
      },
      value: email,
    },
    {
      label: "Password",
      onChange(e: string) {
        setPassword(e);
      },
      value: password,
    },
  ];
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(authenthicateUser(log, email, password, getUserPreference));
  };

  const resetPassword = () => {
    if (log == "logIn") {
      navigate("/resetpassword");
    } else if (log == "signUp") {
      setLog("logIn");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* email text field **************/}
          {fieldInput.map((field, index) => {
            return (
              <Grid key={index} item xs={12}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  required
                  type={field.label.toLowerCase()}
                  color={accent}
                  label={field.label}
                  value={field.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(e.target.value)
                  }
                />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <Button
              sx={{
                width: "100%",
              }}
              variant="contained"
              color={accent}
              type="submit"
            >
              {isLoading ? "loading..." : `${log}`}
            </Button>
            {/* forgot password */}

            <Button
              onClick={() => {
                resetPassword();
              }}
            >
              {log == "logIn" ? "Forgoten Password" : "Already have an account"}
            </Button>
            {/* insert login with google and facebook below*/}

            {/* insert login with google and facebook above*/}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginAndSignUpComponent;
