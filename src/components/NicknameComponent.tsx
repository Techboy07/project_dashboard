import { ChangeEvent, FormEvent, useState, MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { firebase } from "../firebase/firebase.config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../redux";
import { setUserPreference } from "../redux/firebase/userPreference/userPreferenceAction";

export default function FormDialog({
  openNickName,
  handleClose,
}: {
  handleClose: Function;
  openNickName: boolean;
}) {
  const { auth } = firebase();
  const [nickName, setNickName] = useState("");
  const userPreference = useSelector(
    (state: ReduxState) => state.userpreference
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const db = getFirestore();
  const userEmail = auth.currentUser?.email;

  function changeUserNickName(name: string) {
    const docRef = doc(
      db,
      `users/${userEmail}/userPreference`,
      userPreference.id
    );

    updateDoc(docRef, {
      nickname: name,
    })
      .then(() => {
        dispatch(setUserPreference({ ...userPreference, nickname: name }));
      })
      .then(() => setIsLoading(false))
      .then(() => handleClose())
      .catch((err) => {
        alert("an error occured");
        setIsLoading(false);
      });
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    changeUserNickName(nickName);
  }

  return (
    <Dialog open={openNickName} onClose={() => handleClose()}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>Enter new Nickname below</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nickname"
            type="text"
            fullWidth
            variant="standard"
            value={nickName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNickName(e.currentTarget.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button type="submit">{isLoading ? "Loading..." : "Save"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
