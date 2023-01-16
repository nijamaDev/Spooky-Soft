import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';
import ProductDetail from './ProductDetail';
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

export default function ShopProductCard({ register, checkbox }) {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const { name, cover, price, colors, status, priceSale } = register.product;

  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); 
  const [show, setShow] = useState(<Box />);
  const [selected, setSelected] = useState(checkbox)

  useEffect(() => {
    let rightButton;
    if (checkbox){
      rightButton = <Checkbox checked={selected} onClick={() => { setSelected(!selected) }} />
    } else {
      rightButton = <Button style={{ backgroundColor: '#FF4842' }} variant="contained"
                            onClick={() => { setOpen(true); }} >
                      <DeleteForeverIcon />
                    </Button>
    } 
    if (login.role !== "Operario" || login.role !== "Administrador") {
      setShow(
        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Card>
            <Stack p={1} direction="row" spacing={1}>
              <Button variant="filled">
                <EditIcon
                  onClick={() => {
                    setOpenEdit(true)
                  }}
                />
              </Button>
              {rightButton}
            </Stack>
          </Card>
        </Box>
      );
    }
  }, [selected]);

  const handleDelete = () => {
    /*
    axios.delete(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/news/${String(id)}/`).then((res) => {
      console.log(res);
      setOpen(false);
      setOpenSnack(true);
      try {
        setUpdate(!update);
        setSeveritySnack('success');
        setMsgSnack(`${title} has been deleted successfuly.`);
      } catch (error) {
        setSeveritySnack('error');
        setMsgSnack('An error has ocurred.');
      }
    });    
    */
    console.log("borrado papu")
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Box > 
      <Card sx={{ border: selected ? '3px solid #1DA1F2' : '0px solid #1DA1F2', p: selected ? 2.6 : 3 }}>
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

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" onClick={() => setOpenDetail(true)}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={
              typeof colors === 'string' ? colors.split(",") : []
              // colors.split(",")
            } />
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
        </Stack>
        <ProductEdit open={openEdit} setOpen={setOpenEdit} product={register.product} />
        <ProductDetail open={openDetail} setOpen={setOpenDetail} product={register.product} />
      </Card>
      {show}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="erase-dialog-title">{'Are you sure you want to delete this post?'}</DialogTitle>
        <DialogContent>
          <DialogContentText align="justify" id="alert-dialog-description">
            This message is displayed to confirm the user's intention to delete a post. It is a warning message that
            alerts the user that the action cannot be undone and that the post will be permanently removed from the
            system. By clicking "Yes", the user confirms that they understand the consequences of their action and want
            to proceed with the deletion. Clicking "No" cancels the operation and close this dialog without making any
            changes.
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
    </Box>
  );
}
