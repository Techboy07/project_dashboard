import { ReactNode } from "react";
import { Toolbar, AppBar } from "@mui/material";
import MyAppBar from "./AppBar";
import DrawerComponent from "./DrawerComponent";
import { LayOutStyles } from "../styles";

import { useSelector } from "react-redux";
import { ReduxState} from "../redux"

interface LayoutProptypes {
  children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutProptypes) => {

  const authState: boolean = useSelector((state: ReduxState) => state.auth.isUserAuthenthicated  )

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
