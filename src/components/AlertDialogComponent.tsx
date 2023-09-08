import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {projectObject} from "../pages/ProjectPage"

export default function AlertDialog({
  project,
  open,
  handleClose,
  handleDelete,
}: {
  project: projectObject;
  open: boolean;
  handleClose: any;
  handleDelete: any;
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">{project.projectName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <strong>{project.projectName}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            autoFocus
            onClick={handleDelete}
          >
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
