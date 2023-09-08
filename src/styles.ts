import { CSSProperties } from 'react'
import { Theme, useTheme } from '@mui/material';


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
const drawerWidth = 24
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
