import { ReactNode, useState, useEffect } from "react";
import { Toolbar, Paper, AppBar } from "@mui/material";
import MyAppBar from "./AppBar";
import DrawerComponent from "./DrawerComponent";
import { LayOutStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../redux";

import { firebase } from "../firebase/firebase.config";

interface LayoutProptypes {
  children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutProptypes) => {
  const { performOnAuth } = firebase();

  const dispatch = useDispatch();
  const authState = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenticated;
  });
  const userPreference = useSelector((state: ReduxState) => {
    return state.userpreference;
  });

  const { root, page } = LayOutStyles();
  return (
    <div style={root}>
      {authState && (
        <>
          <DrawerComponent />
          <MyAppBar />
        </>
      )}
      <div
        style={{
          ...page,
        }}
      >
        <div>
          {authState && (
            <Toolbar
              sx={{
                paddingTop: "40px",
                maxWidth: "100%",
              }}
            />
          )}
          {children}
        </div>

        {authState && (
          <AppBar
            sx={{
              bgcolor: "background.paper",
              bottom: "0px",
              zIndex: "-20",
            }}
            position="fixed"
          >
            <Toolbar></Toolbar>
          </AppBar>
        )}
      </div>
    </div>
  );
};

export default LayoutComponent;
