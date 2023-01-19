import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';
import ProductEdit from './ProductEdit';
import { AppContext } from '../../context/AppContext';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ index, register, checkbox }) {
  const navigate = useNavigate();
  const { login, scrapping, setScrapping, update, setUpdate } = useContext(AppContext);
  const { id, name, cover, price, colors, priceSale } = register.product;
  const creationDate = new Date(register.product.creation_date)
  const { visits } = register
  const [openEdit, setOpenEdit] = useState(false);
  const [show, setShow] = useState(<Box />);
  const [selected, setSelected] = useState(checkbox);

  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);


  const status = priceSale === null ? creationDate >= twoDaysAgo && creationDate <= today ? 'new' : '' : 'sale';

  useEffect(() => {
    try {
      let rightButton;
      if (checkbox) {
        rightButton = <Checkbox checked={selected} onClick={handleSelect} />;
      } else {
        rightButton = (
          <Button
            style={{ backgroundColor: '#FF4842' }}
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteForeverIcon />
          </Button>
        );
      }

      if (login.role.name === 'Operario' || login.role.name === 'Administrador') {
        setShow(
          <Box mr={-1} mt={-1} pb={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
            {rightButton}
          </Box>
        );
      }
    } catch (error) {
      navigate('/login');
    }
  }, [selected]);

  const handleSelect = () => {
    setSelected(!selected);
    const changeValue = (arr, n, newValue) => {
      arr[n] = newValue;
      return arr;
    };
    setScrapping(changeValue(scrapping, index, !selected));
    console.log(index);
  };

  const openDetail = () => {
    if (checkbox) {
      setOpenEdit(false);
    } else setOpenEdit(true);
    if (login.role.name === 'Visitante' || true) {
      console.log('register', register);
      const obj = {
        p_id: register.product.id,
      };
      axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/add_visit_xd/`, obj).then((res) => {
        console.log(res.data);
      });
    }
  };

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/delete_product/${String(id)}/`).then((res)=>{
      console.log(res.data)
      if(res.data.status === 1){
        setSeveritySnack('success');
      } else {
        setSeveritySnack('error');
      }
      setOpenSnack(true);
      setUpdate(!update)
      setMsgSnack(res.data.msg)
      setOpen(false);
    })
  };

  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [msgSnack, setMsgSnack] = useState('An error has ocurred.');
  const [severitySnack, setSeveritySnack] = useState('success');

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Box>
      <Card sx={{ border: selected ? '3px solid #1DA1F2' : '0px solid #1DA1F2', p: selected ? 2.6 : 3 }}>
        {show}
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {status && (
            <Label
              variant="filled"
              color={(status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {status}
            </Label>
          )}
          <StyledProductImg alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ pt: 3, pl: 3, pr: 3, pb:1 }}>
          <Link color="inherit" underline="hover" onClick={openDetail}>
            <Button>{name.length > 12 ? `${name.substring(0, 24)}...` : name}</Button>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview
              colors={
                typeof colors === 'string' ? colors.split('; ') : []
                // colors.split(",")
              }
            />
            <Typography variant="subtitle1">
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
              &nbsp;
              {fCurrency(price)}
            </Typography>
          </Stack>
          {!checkbox && <Typography style={{ textAlign: "center", color: "gray", fontSize: "0.8rem" }}>
            Seen today: {visits}</Typography>}
        </Stack>
        <ProductEdit open={openEdit} setOpen={setOpenEdit} product={register.product} />
      </Card>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="erase-dialog-title">{'Are you sure you want to delete this product?'}</DialogTitle>
        <DialogContent>
          <DialogContentText align="justify" id="alert-dialog-description">
            This message is displayed to confirm the user's intention to delete a product. It is a warning message that alerts the user that the action cannot be undone and that the post will be permanently removed from the system. By clicking "Yes", the user confirms that they understand the consequences of their action and want to proceed with the deletion. Clicking "No" cancels the operation and close this dialog without making any changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
          {msgSnack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
