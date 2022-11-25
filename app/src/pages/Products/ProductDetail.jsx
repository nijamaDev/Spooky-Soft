import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function AlertDialog({open, setOpen}) {

  /*
  const handleClickOpen = () => {
    setOpen(true);
  };
  */

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Product Name"}
        </DialogTitle>
        <DialogContent>
        <img style={{ width: "100%", height: "100%" }} src={'https://hashmeta.com/th/wp-content/uploads/2012/10/Hashmeta-Banner-Landing-Page-Design-.jpg'} alt="React Logo" />
          <DialogContentText id="alert-dialog-description">
            Descripcion del producto.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atrás</Button>
          <Button onClick={handleClose} autoFocus>
            Ir al proveedor
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}