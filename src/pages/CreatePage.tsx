import { FC, useState, useRef, FormEvent, LegacyRef } from "react";

import {
  Typography,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Paper,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createFormStyles } from "../styles";

// ********************************************************************************************************
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
// ************************************************************************************************

import { firebase } from "../firebase/firebase.config";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux";

const CreatePage: FC = () => {
  const userPreference = useSelector((state: ReduxState) => {
    return state.userpreference;
  });

  const { accent } = userPreference;

  const dispatch = useDispatch();

  const { auth, performOnAuth } = firebase();
  const db = getFirestore();
  // *************************************************************
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("todos");
  const [detailsError, setDetailsError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const realForm: LegacyRef<any> = useRef();

  let userEmail: string | null | undefined;
  performOnAuth(
    () => {
      userEmail = auth.currentUser?.email;
    },
    () => {
      userEmail = "";
    }
  );

  const handleSubmit = (e: FormEvent) => {
    const colRef = collection(db, `users/${userEmail}/notes`);

    e.preventDefault();
    title == "" ? setTitleError(true) : setTitleError(false);
    details == "" ? setDetailsError(true) : setDetailsError(false);
    if (title && details) {
      addDoc(colRef, {
        title: title,
        details: details,
        category: category,
        createdAt: serverTimestamp(),
      }).then(() => {
        alert("done");
        realForm.current.reset();
      });
    }
  };

  const categories: string[] = ["Money", "Work", "Todos", "Reminder"];
  const { field, form } = createFormStyles;

  return (
    <>
      <Paper>
        <form
          style={form}
          ref={realForm}
          noValidate
          autoComplete="Off"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h6"
            component={"h2"}
            color="textSecondary"
            gutterBottom
          >
            Create a New Note
          </Typography>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            label="Note Title"
            color={accent}
            fullWidth
            required
            // sx={field}
            error={titleError}
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
            sx={field}
            error={detailsError}
          />

          <FormControl sx={field}>
            <FormLabel color={accent}>Note category</FormLabel>

            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={category.toLowerCase()}
                    control={<Radio color={accent} />}
                    label={category}
                  />
                );
              })}
            </RadioGroup>

            <FormHelperText></FormHelperText>
          </FormControl>
          <br />
          <Button
            variant="contained"
            type="submit"
            color={accent}
            endIcon={<KeyboardArrowRightIcon fontSize="small" />}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

interface updateForm {
  email: string;
  title: string;
  details: string;
  id: string;
  func: Function;
}

// *********************  EDIT FUNCTION **************************************

export const handleEdit: any = (
  e: FormEvent,
  { email, title, details, id, func }: updateForm
) => {
  const db = getFirestore();
  const docRef = doc(db, `users/${email}/notes`, id);

  e.preventDefault();

  if (title && details) {
    updateDoc(docRef, {
      title: title,
      details: details,
    }).then(() => {
      func();
    });
  }
};

export default CreatePage;
