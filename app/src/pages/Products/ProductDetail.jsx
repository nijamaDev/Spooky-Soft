import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function AlertDialog({open, setOpen, product}) {
  const { name, cover, description, price, colors, status, priceSale } = product;
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
          {name}
        </DialogTitle>
        <DialogContent>
        <img style={{ width: "100%", height: "100%" }} src={cover} alt="React Logo" />
          <DialogContentText id="alert-dialog-description">
            {description}
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