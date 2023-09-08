import { forwardRef, useState, useRef, LegacyRef,FormEvent,useEffect
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { projectObject } from "../pages/ProjectPage";
import { createFormStyles } from "../styles";
import { makeRequest } from "../pages/CreatePage";
import { useDispatch } from "react-redux";
import { getProjectsAction } from "../redux/projects/projectReducer";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const accent = "primary";

export default function FullScreenDialog({
  project,
  open,
  handleClose,
}: {
  project: projectObject;
  open: boolean;
  handleClose: any;
}) {
  // ***********************************************************

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [source, setSource] = useState("");
  const [live, setLive] = useState("");
const dispatch = useDispatch()


  useEffect(()=>{
    setTitle(project.projectName)
    setDetails(project.projectDescription)
    setImage(project.projectImage)
    setSource(project.sourceCode)
    setLive(project.liveLink)
  },[project])


  const apiUrl = import.meta.env.VITE__API_URL
  const realForm: LegacyRef<any> = useRef();
  const { field, form } = createFormStyles;

  const handleEdit = (e:FormEvent)=>{
    e.preventDefault()
    const reqBody =   {projId: project.projectId, projName: title, projDescription: details,image: image, source: source, livePage:live }            
    console.log(reqBody);
    
    makeRequest(`${apiUrl}/projects`,"put", reqBody)
    .then(()=> {
      handleClose()
      alert(`${title} updated successfuly`)
 makeRequest(`${apiUrl}/projects`,"get", null)
      .then((res)=>{
        console.log(res.data)
        const projees:projectObject[] = res.data.map((p:any)=>{
          const {projectName,projectDescription,_id,sourceCode,live,projectImage} = p
          return {projectName,projectDescription,projectImage,projectId:_id,sourceCode,liveLink:live,} })
          dispatch(getProjectsAction(projees))
    }).catch(err => console.log(err))})
    .catch(()=> alert(`${title} was not updated try again`))

  }


  return (<div>
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit
          </Typography>
          <Button
            autoFocus
            color="inherit"
            type="submit"
            onClick={handleEdit}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>

      <form
        style={form}
        ref={realForm}
        noValidate
        autoComplete="Off"
        onSubmit={handleEdit}
      >
        <Typography
          variant="h6"
          component={"h2"}
          color="textSecondary"
          gutterBottom
        >
          Edit <strong>{project.projectName}</strong>
        </Typography>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          label="Note Title"
          color={accent}
          fullWidth
          required
          sx={field}
          value={title}
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
          value={details}
          sx={field}
        />





        <TextField
          onChange={(e) => setImage(e.target.value)}
          variant="outlined"
          label="Details"
          color={accent}
          multiline
          rows={4}
          fullWidth
          required
          value={image}
          sx={field}
        />


        <TextField
          onChange={(e) => setLive(e.target.value)}
          variant="outlined"
          label="Details"
          color={accent}
          multiline
          rows={4}
          fullWidth
          required
          value={live}
          sx={field}
        />


        <TextField
          onChange={(e) => setSource(e.target.value)}
          variant="outlined"
          label="Details"
          color={accent}
          multiline
          rows={4}
          fullWidth
          required
          value={source}
          sx={field}
        />



      </form>
    </Dialog>
  </div>
         );
}
