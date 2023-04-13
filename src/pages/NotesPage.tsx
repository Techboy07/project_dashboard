import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container } from "@mui/material";
import NotesCardComponent from "../components/NotesCardComponent";
import { AppDispatch } from "../redux";
import {
  updateNotes,
  getNotesAction,
} from "../redux/firebase/database/notesAction";
import { firebase } from "../firebase/firebase.config";
import { ReduxState } from "../redux";
import { Auth } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import "../App.css";
import LoadingComponent from "../components/LoadingComponent";

const db = getFirestore();
export interface noteObject {
  createdAt: any;
  category: string;
  title: string;
  details: string;
  id: string;
}

type notes = noteObject[];

// const Notes: notes = [
//   {
//     createdAt: "knows when",
//     category: "reminder",
//     title: "ypescript notaculus",
//     details:
//       "help typescript is hard Reprehenderit voluptate deserunt ut officia eu do amet. Nostrud enim cillum quis voluptate velit Lorem. Ea eiusmod do voluptate qui eu eu culpa pariatur aliquip. Mollit nostrud consectetur consequat elit laborum. Qui esse anim veniam et ex.",
//     id: "1",
//   },
//   {
//     createdAt: "god knows when",
//     category: "reminder",
//     title: "typescript notaculus",
//     details: "help typescript is hard",
//     id: "2",
//   },
// ];

const NotesPage = () => {
  const storeNotes: noteObject[] = useSelector(
    (state: ReduxState) => state.notes.notes
  );
  const [notes, setNotes] = useState<noteObject[]>(storeNotes);
  const [render, setRender] = useState(true);
  const { auth }: { auth: Auth } = firebase();
  const userEmail = auth.currentUser?.email;
  const dispatch: AppDispatch = useDispatch();
  const loading: boolean = useSelector(
    (state: ReduxState) => state.notes.loading
  );
  const authState: boolean = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenticated;
  });

  useEffect(() => {
    updateNotes(userEmail, dispatch).then((res) =>
      dispatch(getNotesAction(res))
    );
  }, [render, authState]);

  const handleDelete = async (note: noteObject, func: Function) => {
    const docRef = doc(db, `users/${userEmail}/notes`, note.id);
    await deleteDoc(docRef).then(() => func());

    const newNotes = notes.filter(
      (noteType: noteObject) => noteType.id != note.id
    );
    dispatch(getNotesAction(newNotes));
    setRender(!render);
  };

  return (
    <>
      <div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <Container>
            <Grid container spacing={3}>
              {storeNotes.map((note: noteObject) => (
                <Grid key={note.createdAt} item xs={12} md={6} lg={4}>
                  <NotesCardComponent
                    render={render}
                    setRender={setRender}
                    Note={note}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </div>
    </>
  );
};

export default NotesPage;
