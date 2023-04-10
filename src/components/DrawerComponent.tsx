import {
  SwipeableDrawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import {
  openDrawerAction,
  closeDrawerAction,
} from "../redux/ui/drawer/drawerAction";

import { ReduxState } from "../redux";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import { LayOutStyles } from "../styles";
import { useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { firebase } from "../firebase/firebase.config";
import { useState, useEffect } from "react";
import {
  setUserPreference,
  getUserPreferenceAction,
} from "../redux/firebase/userPreference/userPreferenceAction";
import { revokeAuthentication } from "../redux/firebase/authentication/authActions";
import SettingsMenuComponent from "./SettingsMenuComponents";
import { userPreferenceStateObject } from "../redux/firebase/userPreference/userPreferenceAction";
import { lightBlue } from "@mui/material/colors";

const DrawerComponent = () => {
  const userPreference = useSelector((state: ReduxState) => {
    return state.userpreference;
  });
  const [light, setLight] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ************* for initial setup**********************
  useEffect(() => {
    if (authState) {
      switchLight();
    }
  }, []);
  // ************************
  // ************ when light state changes***************************
  useEffect(() => {
    if (authState) {
      const userEmail = auth.currentUser?.email;
      const db = getFirestore();
      const colRef = collection(db, `users/${userEmail}/userPreference`);
      getDocs(colRef)
        .then((snapshot) => {
          const user: userPreferenceStateObject = {
            id: snapshot.docs[0].id,
            accent: snapshot.docs[0].data().accent,
            mode: snapshot.docs[0].data().mode,
            nickname: snapshot.docs[0].data().nickname,
          };
          return user;
        })
        .then(({ id, accent, nickname, mode }) => {
          const docRef = doc(db, `users/${userEmail}/userPreference`, id);
          updateDoc(docRef, {
            mode: light,
          })
            .then(() =>
              dispatch(
                setUserPreference({
                  mode: light,
                  accent: accent,
                  nickname: nickname,
                  id,
                })
              )
            )

            .catch((err) => {
              alert("there was setting user preferences");
              throw Error(err);
            });
        })
        .catch((err) => {
          alert("there was an getting user preferences");
          throw Error(err);
        });
    }
  }, [light]);
  // ********************************
  // ******************* redux ***************************

  const drawerState: boolean = useSelector((state: ReduxState) => {
    return state.drawer.isOpen;
  });

  const authState = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenticated;
  });

  const nickname = userPreference.nickname;

  const { accent } = userPreference;
  const { auth, logOut } = firebase();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleDrawer(isDrawerOpen: boolean) {
    if (isDrawerOpen) {
      dispatch(openDrawerAction());
    } else if (!isDrawerOpen) {
      dispatch(closeDrawerAction());
    }
  }

  const switchLight = () => {
    const userEmail = auth.currentUser?.email;
    const db = getFirestore();
    const colRef = collection(db, `users/${userEmail}/userPreference`);
    //  get data from firebase
    getDocs(colRef)
      .then((snapshot) => {
        const user: userPreferenceStateObject = {
          id: snapshot.docs[0].id,
          accent: snapshot.docs[0].data().accent,
          mode: snapshot.docs[0].data().mode,
          nickname: snapshot.docs[0].data().nickname,
        };
        // ******* this is what differentiate the initial from contionous **************
        // sets it locally
        setLight(user.mode);
        // *******************
        return user;
      })
      .then(({ id, accent, nickname }) =>
        //  then it dispatches to redux
        dispatch(
          setUserPreference({
            mode: light,
            accent: accent,
            nickname: nickname,
            id,
          })
        )
      )
      .catch((err) => {
        alert("there was an getting user preferences");
        throw Error(err);
      });
  };

  // ***********************************************

  const menuItems = [
    {
      text: "My notes",

      icon: <SubjectOutlined color={accent} />,
      path: "/Notes",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color={accent} />,
      path: "/Create",
    },
    {
      text: "Logout",
      icon: <HomeOutlinedIcon color={accent} />,
      func: () => {
        logOut(() => dispatch(revokeAuthentication())).then(() =>
          navigate("/")
        );
      },
    },
    {
      text: "Settings",
      icon: <SettingsOutlined color={accent} />,
      func: handleClick,
      child: (
        <SettingsMenuComponent
          open={open}
          setOpen={handleClose}
          anchor={anchorEl}
        />
      ),
    },
  ];

  return (
    <>
      <SwipeableDrawer
        open={drawerState}
        anchor="left"
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <div>
          <div>
            <Typography variant="h5" sx={LayOutStyles().title}>
              {nickname}'s Notes
            </Typography>
          </div>
        </div>

        <List>
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={(e?) => {
                  if (item.path) {
                    navigate(item.path);
                  } else if (item.func) {
                    item.func(e);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              {item.child ? item.child : null}
            </div>
          ))}

          {light ? (
            <ListItem>
              <ListItemIcon>
                <LightModeOutlinedIcon color={accent} />
              </ListItemIcon>

              <Button
                onClick={() => {
                  setLight(false);
                }} /* */
                variant="text"
              >
                Dark mode
              </Button>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemIcon>
                <NightlightOutlinedIcon />
              </ListItemIcon>
              <Button
                onClick={() => {
                  setLight(true);
                }} /**/
                variant="text"
              >
                Light mode
              </Button>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default DrawerComponent;
