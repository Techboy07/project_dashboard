import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  openDrawerAction,
} from "../redux/ui/drawer/drawerAction";
import { ReduxState } from "../redux";

const [, mm, dd, yy] = Date().split(" ");

const MyAppBar = () => {
  const dispatch = useDispatch();
/*
  const authState = useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenticated;
  });
  const userPreference = useSelector((state: ReduxState) => {
    return state.userpreference;
  });



  const { accent } = userPreference;*/
const accent = 'primary'

  const appbar = {
    width: "100%",
    "&.MuiAppBar-root": {
      backgroundColor: `${accent}.dark`,
    },
  };

  return (
    <>
      <AppBar position="fixed" sx={appbar} elevation={0}>
        <Toolbar>
          <MenuOutlinedIcon
            onClick={() => dispatch(openDrawerAction())}
            sx={{ marginRight: "20px" }}
          />
          <Typography
            // variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            {`Today is ${dd} of ${mm} ${yy}`}
          </Typography>

          <Typography>{/*nickname*/}</Typography>
          <Avatar src="/vite.svg" sx={{ padding: "20px" }} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MyAppBar;
