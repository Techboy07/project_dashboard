import { forwardRef, useState, useRef, LegacyRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { noteObject } from "../pages/NotesPage";
import { createFormStyles } from "../styles";
import { handleEdit } from "../pages/CreatePage";
import { firebase } from "../firebase/firebase.config";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const accent = "primary";

export default function FullScreenDialog({
  note,
  open,
  handleClose,
}: {
  note: noteObject;
  open: boolean;
  handleClose: any;
}) {
  // *************************************************************
  const defaultUser: string = "newUser001";
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const [email, setEmail] = useState(defaultUser);
  useEffect(() => {
    if (auth.currentUser) {
      const realUser: string = `${auth.currentUser.email}`;
      setEmail(realUser);
    }
  }, []);

  const realForm: LegacyRef<any> = useRef();
  const { field, form } = createFormStyles;
  const { auth } = firebase();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={(e) =>
                handleEdit(e, {
                  email: email,
                  title: title,
                  details: details,
                  id: note.id,
                  func: handleClose,
                })
              }
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <form
          style={form}
          ref={realForm}
          noValidate
          autoComplete="Off"
          onSubmit={handleEdit}
        >
          <Typography
            variant="h6"
            component={"h2"}
            color="textSecondary"
            gutterBottom
          >
            Edit <strong>{note.title}</strong>
          </Typography>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            label="Note Title"
            color={accent}
            fullWidth
            required
            sx={field}
            value={title}
          />

          <TextField
            onChange={(e) => setDetails(e.target.value)}
            variant="outlined"
            label="Details"
            color={accent}
            multiline
            rows={4}
            fullWidth
            required
            value={details}
            sx={field}
          />
        </form>
      </Dialog>
    </div>
  );
}
