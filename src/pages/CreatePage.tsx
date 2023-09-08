import { FC, useState, useRef, FormEvent, LegacyRef } from "react";

import {
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createFormStyles } from "../styles";
import { techObject } from "./TechPage";
import { projectObject } from "./ProjectPage";

import { getProjectsAction } from "../redux/projects/projectReducer";
import { getTechsAction } from "../redux/techs/techReducer";
import { useDispatch } from "react-redux";
// ********************************************************************************************************

import axios from "axios";

export function makeRequest<T>(link:string,method:string,body: T){
  return axios({
    method: method,
    url: link,
    data: body?body:null,
    headers :{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS" }
  })
}




const CreatePage: FC = () => {
  const accent = 'primary'


  // *************************************************************
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const[live, setLive] = useState("")
  const[source, setSource] = useState("")

  const [tech, setTech] = useState("")

  const [detailsError, setDetailsError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [imageError, setImageError] = useState(false)
  const [techError,setTechError]= useState(false)

const dispatch = useDispatch()
  const techForm: LegacyRef<any> = useRef()
  const realForm: LegacyRef<any> = useRef();
  const apiUrl = import.meta.env.VITE__API_URL

  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault();
    title == "" ? setTitleError(true) : setTitleError(false);
    details == "" ? setDetailsError(true) : setDetailsError(false);
    image == "" ? setImageError(true) : setDetailsError(false);

    if (title && details && image) {
      makeRequest(`${apiUrl}/projects`,"post",{
        projName: title,
        projDescription: details,
        image: image,
        livePage:live,
        source: source

      }).then(()=>{



        makeRequest(`${apiUrl}/projects`, "get", null )
        .then(res => {
          const techees:projectObject[] = res.data.map((t:any)=> {
            const {_id ,projectName,projectDescription,
            projectImage,sourceCode,live} = t
            return {projectId: _id,projectImage,projectName,projectDescription,sourceCode,liveLink: live}
          })
          dispatch( getProjectsAction(techees))
          alert("successfuly created")
        })




      }).then((res)=> {
        realForm.current.reset()
        console.log(res); })
        .catch(err => console.log(err))
    }
  }
  const handleTechSubmit = (e:FormEvent) => {
    e.preventDefault()
    if(tech !== ""){
      makeRequest(`${apiUrl}/techs`,"post",{image: tech})
      .then(()=>{
makeRequest(`${apiUrl}/techs`, "get", null )
        .then(res => {
          const techees:techObject[] = res.data.map((t:any)=> {
            const {_id ,imageLink} = t
            return {techId: _id, imageLink}
          })
          dispatch( getTechsAction(techees))
          alert("tech successfuly created")
        }) })
    .then((res)=>{
      console.log(res)
      techForm.current.reset()
    })
    .catch(err => {console.log(err)})}
    else{
setTechError(true)
    }
  }
  const { field, form } = createFormStyles;

  return (
    <>
      <Paper>
        <form
          style={form}
          ref={realForm}
          noValidate
          autoComplete="Off"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h6"
            component={"h2"}
            color="textSecondary"
            gutterBottom
          >
            Add a New Project
          </Typography>

          <TextField
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            label="Title"
            color={accent}
            fullWidth
            required
            // sx={field}
            error={titleError}
          />

          <TextField
            onChange={(e) => setDetails(e.target.value)}
            variant="outlined"
            label="Details"
            color={accent}
            multiline
            rows={4}
            fullWidth
            required
            sx={field}
            error={detailsError}
          />


          <TextField
            onChange={(e) => setImage(e.target.value)}
            variant="outlined"
            label="Image Url"
            color={accent}
            fullWidth
            required
            // sx={field}
            error={imageError} 
          />


          <TextField
            onChange={(e) => setLive(e.target.value)}
            variant="outlined"
            label="Live Url"
            color={accent}
            fullWidth
            required
            // sx={field}
          />




          <TextField
            onChange={(e) => setSource(e.target.value)}
            variant="outlined"
            label="Source Code"
            color={accent}
            fullWidth
            required
            // sx={field}
          />


          <br />
          <Button
            variant="contained"
            type="submit"
            color={accent}
            endIcon={<KeyboardArrowRightIcon fontSize="small" />}
          >
            Submit
          </Button>
        </form>
      </Paper>



      <Paper>
        <form onSubmit={handleTechSubmit}
          style={form} 
          noValidate
          autoComplete="off"
          ref={techForm}
        >


          <Typography
            variant="h6"
            component={"h2"}
            color="textSecondary"
            gutterBottom
          >
            Add a New Technology
          </Typography>


          <TextField
            onChange={(e) => setTech(e.target.value)}
            variant="outlined"
            label="Tech Image Url"
            color={accent}
            fullWidth
            required
            // sx={field}
            error={techError}
          />


          <Button
            variant="contained"
            type="submit"
            color={accent}
            endIcon={<KeyboardArrowRightIcon fontSize="small" />}
          >
            Submit
          </Button>
        </form>

      </Paper>

    </>
  );
};

interface updateForm {
  email: string;
  title: string;
  details: string;
  id: string;
  func: Function;
}

// *********************  EDIT FUNCTION **************************************

export const handleEdit  = () => {

};

export default CreatePage;
