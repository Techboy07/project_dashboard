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
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const DrawerComponent = () => {
  //const userPreference = useSelector((state: ReduxState) => {
  //return state.userpreference;
 // });
  //
  const {logout} = useAuth0()
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
  //
  //
  // ********************************
  // ******************* redux ***************************

  const drawerState: boolean = useSelector((state: ReduxState) => {
    return state.drawer.isOpen;
  });

  const authState:boolean = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenthicated
  });

  const nickname =  'New user'//userPreference.nickname;

  //const { accent } = userPreference;

  const accent = 'primary'
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
  /*  const userEmail = auth.currentUser?.email;
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
        });*/
  };

  // *************************************************************

  const menuItems =[
 {
      text: "My Tech Stack",

      icon: <SubjectOutlined color={accent} />,
      path: "/techs",
    },
    
    {
      text: "My Projects",

      icon: <SubjectOutlined color={accent} />,
      path: "/Projects",
    },
    {
      text: "Add Project",
      icon: <AddCircleOutlineOutlined color={accent} />,
      path: "/Create",
    },
    {
      text: "Logout",
      icon: <HomeOutlinedIcon color={accent} />,
      func: () =>  {

 logout({ logoutParams: { returnTo: window.location.origin } }) },
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
                  e.preventDefault()
                  if (item.path) {
                    navigate(item.path);
                  } else if (item.func) {
                    item.func();
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
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
