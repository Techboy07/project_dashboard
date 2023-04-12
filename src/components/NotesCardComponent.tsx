import { useState, useEffect, SetStateAction } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  CardActions,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AlertDialog from "../components/AlertDialogComponent";
import FullScreenDialog from "./FullScreenDialogComponent";
import { noteObject } from "../pages/NotesPage";
import { NoteStyles } from "../styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Timestamp } from "firebase/firestore";
interface noteCardProps {
  Note: noteObject;
  handleDelete: any;
  render: boolean;
  setRender: any;
}

let arr: string[] = [];

for (let index = 0; index < 100; index++) {
  arr.push("1");
}

const NotesCardComponent = ({
  Note,
  handleDelete,
  render,
  setRender,
}: noteCardProps) => {
  const [open, setOpen] = useState(false);
  const [OpenFullScreen, setOpenFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClickOpenFull = () => {
    setOpenFullScreen(true);
  };
  const handleCloseFull = () => {
    setOpenFullScreen(false);

    setRender(!render);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { avatar } = NoteStyles(Note);

  const date = new Timestamp(Note.createdAt.seconds, Note.createdAt.nanoseconds)
    .toDate()
    .toString()
    .split(" ")
    .slice(1, 5)
    .join(" ")
    .slice(0, 17);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);
  return (
    <Card elevation={4}>
      <CardHeader
        avatar={<Avatar sx={avatar}>{Note.category[0].toUpperCase()}</Avatar>}
        action={
          <>
            <IconButton onClick={() => handleClickOpenFull()}>
              <EditOutlinedIcon />
            </IconButton>
          </>
        }
        title={Note.title}
        subheader={date}
      />
      <CardContent>
        {Note.details.split(/\n/).map((detail, index) => {
          return (
            <Typography key={index} sx={{ wordWrap: "break-word" }}>
              {detail}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => handleClickOpen()}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            navigator.clipboard
              .writeText(Note.details)
              .then(() => setCopied(true));
          }}
        >
          {copied ? (
            <>
              <p style={{ fontSize: "12px" }}>copied </p>
              <CheckCircleIcon color="success" />
            </>
          ) : (
            <ContentCopyOutlinedIcon />
          )}
        </IconButton>
      </CardActions>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        note={Note}
        handleDelete={handleDelete}
      />

      <FullScreenDialog
        open={OpenFullScreen}
        handleClose={handleCloseFull}
        note={Note}
      />
    </Card>
  );
};

export default NotesCardComponent;
