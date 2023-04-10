import "./App.css";
import { FC } from "react";
import LayoutComponent from "./components/LayoutComponent";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotesPage from "./pages/NotesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "./redux";
import { firebase } from "./firebase/firebase.config";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Quicksand ,sans-serif",
  },
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  typography: {
    fontFamily: "Quicksand ,sans-serif",
  },
});

const App: FC = function () {
  const mode: boolean = useSelector((state: ReduxState) => {
    return state.userpreference.mode;
  });

  const [Theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    if (mode) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <LayoutComponent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/notes" element={<NotesPage />} />
            </Routes>
          </LayoutComponent>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
