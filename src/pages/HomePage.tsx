import { useState, FC, useEffect } from "react";
import { Paper, Container, Grid, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReduxState } from "../redux";
import { useAuth0 } from "@auth0/auth0-react";
import { logInUserAction } from "../redux/auth/authReducer";
import { getProjectsAction } from "../redux/projects/projectReducer";
import { getTechsAction } from "../redux/techs/techReducer";
import { makeRequest } from "./CreatePage";
import { techObject } from "./TechPage";





const accent = "primary";
const HomePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loginWithRedirect , isAuthenticated } = useAuth0()
  const apiUrl = import.meta.env.VITE__API_URL
  useEffect(()=>{
if(isAuthenticated){
dispatch(logInUserAction())
makeRequest(`${apiUrl}/projects`,"get", null )
.then(res => {
  const projects = res.data.map( (project:any )=> { 
    return {
      projectName:project.projectName,
      projectDescription: project.projectDescription,
      projectImage:project.projectImage,
      sourceCode:project.sourceCode,
      projectId:project._id,
      liveLink: project.live }
  })
dispatch(getProjectsAction(projects))})

makeRequest(`${apiUrl}/techs`, "get", null)
.then(res => {
  const techs:techObject[] = res.data.map((tech:any) => {
    const {_id,imageLink} = tech  
    return {techId: _id, imageLink: imageLink}})
    dispatch(getTechsAction(techs))
}
)

}},[isAuthenticated])



  const authState:boolean =  useSelector((state: ReduxState) => {
    return state.auth.isUserAuthenthicated
    });
  const [mobile, setMobile] = useState({
    text: "center",
    flex: "center",
  });


  const { text, flex } = mobile;


  return (
    <>
      <Paper>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              textAlign: text,
            }}
          >
            <Grid container item xs={12}>
              <Typography
                variant="h5"
                color={accent}
                sx={{ fontWeight: "700", width: "100%" }}
              >
                Welcome!
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "700",
                  width: "100%",
                }}
            >

                Welcome Lord Toluwalase 
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" color={"textSecondary"}>
                " The faintest ink is greater than the sharpest brain "
              </Typography>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sx={{
                justifyContent: flex,
              }}
            >
              <Grid item>
                {authState ? (
                  <Button
                    variant="contained"
                    sx={{
                      width: "150px",
                    }}
                    color={accent}
                    onClick={() => navigate("/projects")}
                  >
                    My notes
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      width: "150px",
                    }}
                    color={accent}
                    onClick={()=>loginWithRedirect()}
                  >
                    {/*!auth*/ true ? "Login" : "Logout"}
                  </Button>
                )}
                </Grid>
              </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default HomePage;
