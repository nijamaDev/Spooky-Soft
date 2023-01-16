import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { fCurrency } from '../../utils/formatNumber';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function AlertDialog({ open, setOpen, product }) {
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
        <DialogTitle id="alert-dialog-title">Editing: {name}</DialogTitle>
        <DialogContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <img style={{ width: '50%', height: '100%' }} src={cover} alt="React Logo" />
            <Stack>
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fCurrency(priceSale)}
              </Typography>
              <Typography pb={2} variant="h3">
                {fCurrency(price)}
              </Typography>
              <Typography align="justify">{description}</Typography>
            </Stack>
          </Stack>
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
