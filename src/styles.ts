import { CSSProperties } from 'react'
import { noteObject } from './pages/NotesPage';
import { yellow, green, pink, blue } from "@mui/material/colors";
import { Theme, useTheme } from '@mui/material';
import { store } from './redux';

const mode = store.getState().userpreference.mode

export const modalStyles: object = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  aspectRatio: 1,
  width: "90%",
};
export const createFormStyles: { field: CSSProperties; form: Object } = {
  field: {
    marginTop: "20px",
    display: "block",
    marginBottom: "20px",
  },
  form: {
    boxSizing: "border box",
    padding: 20,
  },
};

export const NoteStyles = (note: noteObject) => {
  return {
    card: {
      // border: () => {
      //   if (note.category == 'work') {
      //     return '1px solid red'
      //   }
      // }
    },
    avatar: {
      backgroundColor: () => {
        if (note.category == 'work') {
          return yellow[700]
        } if (note.category == 'todos') {
          return pink[500]
        } if (note.category == 'money') {
          return green[500]
        }
        return blue[500]
      }
    }
  }
}


const drawerWidth = 240;


export const LayOutStyles = () => {

  const theme: Theme = useTheme();
  return {
    page: {
      // backgroundColor: theme.palette.success.light,
      width: "100%",
      padding: theme.spacing(3),

    },
    drawer: {
      width: drawerWidth,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
      },
    },
    root: {
      display: "flex",
    },
    title: {
      padding: theme.spacing(2),
    },

    toolbar: theme.mixins.toolbar,
  };
};
