import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { noteObject } from "../pages/NotesPage";

export default function AlertDialog({
  note,
  open,
  handleClose,
  handleDelete,
}: {
  note: noteObject;
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
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{note.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <strong>{note.title}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            autoFocus
            onClick={() => {
              handleDelete(note, handleClose);
            }}
          >
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
