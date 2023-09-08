import {
  forwardRef,
  useState,
  useRef,
  LegacyRef,
  useEffect,
  FormEvent,
} from "react";
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
import { createFormStyles } from "../styles";
import { handleEdit } from "../pages/CreatePage";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux";
import { useNavigate } from "react-router-dom";

type accentType =
  | "primary"
  | "error"
  | "secondary"
  | "info"
  | "success"
  | "warning";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgotPasswordPage({}: {}) {
  // *************************************************************
  const [email, setEmail] = useState("");

  const accent = 'primary'

  const navigate = useNavigate();
  const realForm: LegacyRef<any> = useRef();
  const { field, form } = createFormStyles;
  const [renderedText, setRenderedText] = useState(
    "A link will be sent to your email. Follow the link to reset your password!!!"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        onClose={() => {}}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Reset my password
            </Typography>
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
            Input your email below
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            label="Email"
            type="email"
            color={accent}
            fullWidth
            required
            sx={field}
            value={email}
          />
          <Typography>{isLoading ? "loading..." : renderedText}</Typography>
          <Button
            type="submit"
            variant="contained"
            autoFocus
            color={accent}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            reset
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
