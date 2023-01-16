// import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { fCurrency } from '../../utils/formatNumber';
import FormContainer from '../../components/Forms/FormContainer'
import FormItem from '../../components/Forms/FormItem'
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function AlertDialog({ open, setOpen, product }) {
  const { name, cover, description, price, colors, status, priceSale } = product;
  const [ nameF, setNameF] = useState(name);
  const phone = 12;
  const computer = 6;

  const handleInputChange = ({ target }) => {
    // setCreatedAt(new Date().toISOString().slice(0, 10));
    switch (target.id) {
      case 'nameF':
        setNameF(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };
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
        <DialogContent >
        <FormContainer>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="nameF" label="Name" value={nameF} onChange={handleInputChange} />
              </FormItem>
              <Grid item xs={phone} sm={12}>
                <Typography variant="h5" gutterBottom>
                  Preview
                </Typography>
              </Grid>
              {
                /*
                <BlogPostCard post={{ cover, title, description, redirect, createdAt }} index={3} />
                */
              }
              <FormItem phone={phone} computer={12}>
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" pt={3}>
                  <Button variant="contained" color="secondary" type="submit">
                    Edit post
                  </Button>
                </Box>
              </FormItem>
            </FormContainer>
          
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <img style={{ width: '50%', height: '100%' }} src={cover} alt="" />
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
