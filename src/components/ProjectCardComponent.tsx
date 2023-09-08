import { Card,CardMedia, CardContent,Typography,Button,CardActions } from "@mui/material";



interface projectProps{
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  sourceCode: string;
  liveLink: string;
  edit:Function;
  deleteFn:Function
}

const ProjectCardComponent = ({projectName , projectDescription,projectImage ,sourceCode,liveLink, projectId,edit, deleteFn}:projectProps)=>{

  function editProject() {
    edit();
    console.log(`edit project ${projectName}`)
  }
  function deleteProject(){
    deleteFn()
console.log(`delete project ${projectName}`)}




    return( 

      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="project image"
            height="140"
            image= {projectImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {projectName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {projectDescription}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={editProject} size="small">Edit</Button>
            <Button onClick={deleteProject} size="small">Delete</Button>
          </CardActions>
        </Card>
      </>)
}


export default ProjectCardComponent
