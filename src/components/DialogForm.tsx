import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

const useStyles = makeStyles({
  root: {
    paddingLeft: "10px",
    zIndex: 10,
    width: "90%",
    display: "flex",
    flexFlow: "column nowrap",
    position: "absolute",
    top: "80px",
  },
  displayBlock: {
    /*Sets modal to center*/
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  displayNone: {
    display: "none",
  },
});

interface DialogFormProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // No idea what those types are
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  content: string;
}

const DialogForm: React.FC<DialogFormProps> = ({
  children,
  open,
  handleClose,
  onSubmit,
  title,
  content,
}) => {
  const classes = useStyles();

  const showHideClassName = open ? classes.displayBlock : classes.displayNone;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="error" onClick={onSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
