import TechCardComponent from "../components/TechCardComponent"
import { ReduxState } from "../redux";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from "react";
import AlertDialog from "../components/AlertDialogComponent";
import { makeRequest } from "./CreatePage";
import {getTechsAction} from "../redux/techs/techReducer";
import { Grid } from "@mui/material";

export interface techObject{
  imageLink: string
  techId:string
} 


const TechPage = ()=>{
  const projs = useSelector((state:ReduxState)=> state.techs.techs)
  const dispatch = useDispatch()
  const [projects, setProjects]=useState<techObject[]>([])
  const [project,setProject]= useState(projects[0])
  const [openAlert,setOpenAlert] = useState(false)

  useEffect(()=>{
    setProjects(projs)
  },[projs])
  const apiUrl = import.meta.env.VITE__API_URL

  const handleClose =()=>{
    setOpenAlert(false)
  }

  const handleDelete = ()=>{
    const reqBody = {techId: project.techId}

    makeRequest(`${apiUrl}/techs`,"delete", reqBody)
    .then(()=>{
      makeRequest(`${apiUrl}/techs`, "get", null )
      .then(res => {
        const techees:techObject[] = res.data.map((t:any)=> {
          const {_id ,imageLink} = t
          return {techId: _id, imageLink}
        })
        dispatch( getTechsAction(techees))
        alert("successfuly deleted")
      }).then(()=>handleClose())
    }).catch(err => console.log(err))
  }

  return (

    <>{project && <AlertDialog
      handleDelete={handleDelete}
      handleClose={handleClose} 
      open={openAlert}
      project={{
        projectName:project.techId,
        projectDescription: "",
        projectImage: project.imageLink,
        projectId: project.techId,
        sourceCode: "",
        liveLink: ""
      }}   />}
      <Grid container spacing={4} sx={{paddingInline: "auto"}}>
        {
          projects.map((tech, idx)=>
            <Grid item xs={12} sm={4} md={3}>
              <TechCardComponent 
                key={idx}
                techImageLink={tech.imageLink}
                techId={tech.techId}
                deleteFn={()=>{
                  setProject(tech)
                  setOpenAlert(true)
                }}
              />
            </Grid>
                      )
        }
      </Grid>
    </>)
}


export default TechPage;
