import { Card,CardMedia, Button,CardActions } from "@mui/material";



interface techProps{
  techImageLink: string;
  techId: string;
  deleteFn: any

}

const TechCardComponent = ({techImageLink, techId, deleteFn}:techProps)=>{

  const deleteTech =  () => {
    deleteFn()
    console.log(`delete tech with id: ${techId}`);

  }


  return( 

    <>
      <Card sx={{ maxWidth: 200}}>
        <CardMedia
          component="img"
          alt="tech image"
          sx={{width: "100%"}}
          image= {techImageLink}
        />
        <CardActions>
          <Button onClick={deleteTech} size="small">Delete</Button>
        </CardActions>
      </Card>
    </>)
}


export default TechCardComponent
