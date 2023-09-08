import ProjectCardComponent from "../components/ProjectCardComponent";
import { ReduxState } from "../redux";
import { useSelector } from "react-redux";
import {useState, useEffect} from "react";
import FullScreenDialog from '../components/FullScreenDialogComponent'
import AlertDialog from "../components/AlertDialogComponent";
import { makeRequest } from "./CreatePage";
import { useDispatch } from "react-redux";
import { getProjectsAction } from "../redux/projects/projectReducer";
import { Grid } from "@mui/material";


export interface projectObject{
  projectName: string;
  projectDescription: string;
  projectImage: string;
  sourceCode: string;
  liveLink: string;
  projectId: string
} 


const ProjectPage = ()=>{
  const projs = useSelector((state:ReduxState)=> state.projects.projects)
const dispatch = useDispatch()
  const apiUrl = import.meta.env.VITE__API_URL
  const [projects, setProjects]=useState<projectObject[]>([])
  const [project, setProject] = useState<projectObject>(projects[0])
  const [openDialog, setOpenDialog] = useState(false)

  const [openAlert,setOpenAlert] = useState(false)

  useEffect(()=>{
    setProjects(projs)
  },[projs])

  const handleCloseDialog=()=>{
    setOpenDialog(false)
  }
  const handleClose = ()=>{
    setOpenAlert(false)
  }

  const handleDelete= ()=>{
    const reqBody =  {projId: project.projectId}
    console.log(reqBody);

    makeRequest(`${apiUrl}/projects`,"delete", reqBody)
    .then(()=>{
      handleClose()
      alert(`${project.projectName} successfully deleted !!!`)
      makeRequest(`${apiUrl}/projects`,"get", null)
      .then((res)=>{
        console.log(res.data)

        const projees:projectObject[] = res.data.map((p:any)=>{
          const {projectName,projectDescription,_id,sourceCode,live,projectImage} = p
          return {projectName,projectDescription,projectImage,projectId:_id,sourceCode,liveLink:live,} })
          dispatch(getProjectsAction(projees))
      })
    }).catch(err => console.log(err))





  } 
  return (

    <>
      {project && <AlertDialog project={project} open={openAlert} handleClose={handleClose} handleDelete={handleDelete} />}
      {
        project && <FullScreenDialog project={project} open={openDialog} handleClose={handleCloseDialog} />}
      <div>
        <Grid container spacing={4}>
        {
          
          projects.map((project, idx)=>
            <Grid item xs ={12} sm={4} md={4}>
            <ProjectCardComponent 
            key={idx} 
            projectName={project.projectName} 
            projectDescription={project.projectDescription}
            projectImage={project.projectImage}
            liveLink={project.liveLink}
            sourceCode={project.sourceCode}
            projectId={project.projectId}
            edit={()=>{
              setProject(project)
              setOpenDialog(true)}}
            deleteFn ={()=>{
              setProject(project)
              setOpenAlert(true)}}
          />
</Grid>
              )
        }
          </Grid>
      </div>
    </>)
}


export default ProjectPage;
