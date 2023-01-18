// import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CirclePicker } from 'react-color';
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import { fCurrency } from '../../utils/formatNumber';
import FormContainer from '../../components/Forms/FormContainer'
import FormItem from '../../components/Forms/FormItem'
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
/*
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
*/

export default function AlertDialog({ open, setOpen, product }) {
  // console.log("product",product)
  const { id, name, cover, description, price, colors, redirect, priceSale } = product;
  // console.log(typeof colors === 'string' ? colors.split(",").length <= 2 ? colors.split(",")[0] : colors.split(",")[1] : [])
  const [ nameF, setNameF] = useState(name);
  const [ descriptionF, setDescriptionF ] = useState(description)
  const [ coverF, setCoverF] = useState(cover)
  const [ priceF, setPriceF] = useState(price)
  const [ priceSaleF, setPriceSaleF] = useState(priceSale)
  const [color1, setColor1] = useState(typeof colors === 'string' ? colors.split("; ").length >= 1 ? colors.split("; ")[0] : "Not Found" : "Not Found");
  const [ color2, setColor2] = useState(typeof colors === 'string' ? colors.split("; ").length === 2 ? colors.split("; ")[1] : "Not Found" : "Not Found");
  const [ colorsF, setColorsF] = useState("");
  const colorsOptions = ["#ffffff", "#f44336", "#9c27b0", "#3f51b5", "#2196f3", "#4caf50", "#8bc34a", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#000001"];
  const [ displayEdit, setDisplayEdit] = useState(false);

  // console.log("color2",color2)
  useEffect(()=>{
    let colorAux = ""
    // console.log("color1",color1)
    // console.log("color2",color2)
    if(color1 !== 'Not Found'){
      colorAux += color1
      if(color2 !== 'Not Found'){colorAux += "; "}
    }
    if(color2 !== 'Not Found'){colorAux += color2}
    setColorsF(colorAux)
  }, [color1,color2])

  const handleInputChange = ({ target }) => {
    // setCreatedAt(new Date().toISOString().slice(0, 10));
    switch (target.id) {
      case 'nameF':
        setNameF(target.value);
        break;
      case 'descriptionF':
        setDescriptionF(target.value);
        break;
      case 'coverF':
        setCoverF(target.value);
        break;
      case 'priceF':
        setPriceF(target.value);
        break;
      case 'priceSaleF':
        setPriceSaleF(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name:nameF, description:descriptionF,
      cover:coverF, redirect,
      price:priceF, priceSale:priceSaleF,
      location:"", colors:colorsF
    };
    console.log(obj);
    axios.put(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/update_product/${id}/`, obj).then((res) => {
      console.log(res.data);
    })
  }

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
        scroll='body'
      >
        <DialogContent >
          <Typography variant="h4" gutterBottom pb={3}>Editing: {nameF}</Typography>
          <Box mb={3} display="flex" justifyContent="center"><Button variant="contained" color="secondary" onClick={()=>{setDisplayEdit(!displayEdit)}}>Toggle Edit</Button></Box>
          <Box onSubmit={handleSubmit} component="form" pt={3} pr={3} pb={3} sx={{display:displayEdit ? "block" : "none", border: '1px solid #D3D3D3', borderRadius: '10px'}}>
            <FormContainer>
              <FormItem phone={12} computer={12}>
                <TextField required fullWidth id="nameF" label="Product Name" value={nameF} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={6} computer={6}>
                <TextField required fullWidth id="priceF" label="Price" value={priceF} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={6} computer={6}>
                <TextField required fullWidth id="priceSaleF" label="Sale price" value={priceSaleF} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={12} computer={12}>
                <TextField required fullWidth multiline rows={4} id="descriptionF" label="Description" value={descriptionF} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={12} computer={12}>
                <TextField required fullWidth id="coverF" label="Image Url" value={coverF} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={12} computer={12}>
                <Box p={1.5} display='flex' justifyContent='space-between' sx={{backgroundColor: '#D3D3D3'}}>
                  <Typography>Primary Color</Typography>
                  <CirclePicker
                      color={color1}
                      colors={colorsOptions}
                      onChange={(newColor) => setColor1(newColor.hex)}
                    />
                  <Button variant="outlined" onClick={() => {setColor1("Not Found")}} startIcon={<DeleteIcon />}>Clear</Button>
                </Box>        
              </FormItem>
              <FormItem phone={12} computer={12}>
                <Box p={1.5} display='flex' justifyContent='space-between' sx={{backgroundColor: '#D3D3D3'}}>
                  <Typography>Secondary Color</Typography>
                  <CirclePicker
                    color={color2}
                    colors={colorsOptions}
                    onChange={(newColor) => setColor2(newColor.hex)}
                  />
                  <Button variant="outlined" onClick={() => {setColor2("Not Found")}} startIcon={<DeleteIcon />}>Clear</Button>
                </Box>        
              </FormItem>
              <FormItem phone={12} computer={12}>
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" pt={3}>
                  <Button variant="contained" color="secondary" type="submit">
                    Edit post
                  </Button>
                </Box>
              </FormItem>
            </FormContainer>
          </Box>
          <Button variant="contained" color="secondary" onClick={()=>console.log(color1,color2)}>
            Print Colors
          </Button>
          
            
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <img style={{ width: '50%', height: '100%' }} src={coverF} alt="" />
            <Stack>
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fCurrency(priceSaleF)}
              </Typography>
              <Typography pb={2} variant="h3">
                {fCurrency(priceF)}
              </Typography>
              <Typography>Available Colors</Typography>
              <Box p={2} width="100%" m={.5} sx={{backgroundColor: color1 !== "Not Found" ? color1 : "#ffffff"}} />
              <Box p={2} width="100%" m={.5} sx={{backgroundColor: color2 !== "Not Found" ? color2 : " #ffffff"}} />
              
            </Stack>
          </Stack>
          <Typography pt={2}>{descriptionF}</Typography>
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
