import "./App.css";
import { FC, useState, useEffect } from "react";
import LayoutComponent from "./components/LayoutComponent";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProjectPage from "./pages/ProjectPage";
import { Auth0Provider } from "@auth0/auth0-react";
import TechPage from "./pages/TechPage";

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
  const [Theme, setTheme] = useState(lightTheme);



  return (
    <>
      <Auth0Provider domain={import.meta.env.VITE__DOMAIN} clientId={import.meta.env.VITE__CLIENT_ID}
         authorizationParams={{
      redirect_uri: window.location.origin
    }}
      >
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <LayoutComponent>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/resetpassword" element={<ForgotPasswordPage />} />
                <Route path="/projects" element={<ProjectPage/>}/>
                <Route path="/techs" element={<TechPage/>}/>
              </Routes>
            </LayoutComponent>
          </BrowserRouter>
        </ThemeProvider>

      </Auth0Provider>
    </>
  );
};

export default App;
