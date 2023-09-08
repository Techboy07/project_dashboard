import { useState } from "react";
import {
  Paper,
  Button,
  Menu,
  ListItem,
  IconButton,
  MenuList,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import NickNameComponent from "./NicknameComponent";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../redux";
interface setting {
  type: string;
  child?: JSX.Element;
  func: Function;
  key: boolean;
}

type color = "warning" | "success" | "error" | "primary" | "secondary" | "info";

const themeColors: color[] = [
  "warning",
  "success",
  "error",
  "primary",
  "secondary",
  "info",
];

const ColorComponents = () => {





  return (
    <Paper
      elevation={3}
      sx={{ position: "absolute", zIndex: "30", width: "90%" }}
    >
      <MenuList
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
        }}
      >
        {themeColors.map((color, index) => {
          return (
            <Button
              onClick={() => switchTheme(color)}
              key={index}
              sx={{
                padding: "20px",
              }}
              variant="contained"
              color={color}
            />
          );
        })}
      </MenuList>
    </Paper>
  );
};

const SettingsMenuComponent = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
  anchor: HTMLElement | null;
}) => {
  const [openColors, setOpenColors] = useState(false);
  const [openNickName, setOpenNickName] = useState(false);
  const userPreference = useSelector((state: ReduxState) => {
    return state.userpreference;
  });

  const handleClickOpen = () => {
    setOpenNickName(true);
  };

  const handleClose = () => {
    setOpenNickName(false);
  };

  const settings: setting[] = [
    {
      type: "setNickname",
      func: () => {
        handleClickOpen();
      },
      key: openNickName,
      child: (
        <NickNameComponent
          handleClose={handleClose}
          openNickName={openNickName}
        />
      ),
    },
    {
      type: "chooseTheme",
      child: <ColorComponents />,
      func: () => {
        if (openColors) {
          setOpenColors(false);
        } else {
          setOpenColors(true);
        }
      },
      key: openColors,
    },
  ];
  return (
    <>
      {open && (
        <MenuList>
          <ListItem>
            <IconButton
              sx={{
                position: "absolute",
                right: "0px",
                top: "0px",
                zIndex: "100",
              }}
              onClick={() => setOpen()}
            >
              <CancelIcon />
            </IconButton>
          </ListItem>
          {settings.map((setting: setting, index: number) => {
            return (
              <ListItem key={setting.type} onClick={() => setting.func()}>
                {setting.type == "chooseTheme" ? (
                  <Button variant="contained" color={userPreference.accent}>
                    {setting.type}
                  </Button>
                ) : (
                  <Button>{setting.type}</Button>
                )}

                {setting.key && setting.child}
              </ListItem>
            );
          })}
        </MenuList>
      )}
    </>
  );
};

export default SettingsMenuComponent;
