import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Link, Card, Grid, Avatar, Typography, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import { AppContext } from '../../context/AppContext'
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledDesc = styled(Typography)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
})

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export default function BlogPostCard({ post, index, showButtons}) {
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(AppContext);
  const [show, setShow] = useState(<Box />)

  const { id, title, description, redirect, createdAt } = post;
  let { cover } = post;
  
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
 
  if (!isImage(cover)){
    cover = 'https://img.freepik.com/free-vector/hand-drawn-flat-design-mountain-landscape_52683-79195.jpg?w=2000'
  }

  useEffect(()=>{   
    if(showButtons){
      setShow(
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Card>
          <Stack p={1} direction="row"  spacing={1}>
            <Button  variant='filled'>
              <EditIcon onClick={()=>{navigate('/dashboard/edit_post', { state: post, replace: true })}}/>
            </Button>
            <Button style={{ backgroundColor: "#FF4842" }} variant='contained' onClick={()=>{setOpen(true)}}>
              <DeleteForeverIcon />
            </Button>
          </Stack>
        </Card>  
      </Box>
      )
    }
  },[])  

  const handleClose = () => {
    axios.delete(`http://localhost:8000/basic/api/news/${String(id)}/`).then((res) => {
      console.log(res);
        setOpen(false);
        setOpenSnack(true);
      try {
        setUpdate(!update)
        setSeveritySnack('success')
        setMsgSnack(`${title} has been deleted successfuly.`)
      } catch (error) {
        setSeveritySnack('error')
        setMsgSnack('An error has ocurred.')
      }
    })
    setOpen(false);
  };

  const [open, setOpen] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [msgSnack, setMsgSnack] = useState('An error has ocurred.')
  const [severitySnack, setSeveritySnack] = useState('success')

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
          <Card sx={{ position: 'relative' }}>
            <StyledCardMedia
              sx={{
                ...((latestPostLarge || latestPost) && {
                  pt: 'calc(100% * 4 / 3)',
                  '&:after': {
                    top: 0,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  },
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: 'calc(100% * 4 / 3)',
                    sm: 'calc(100% * 3 / 4.66)',
                  },
                }),
              }}
            >
              <StyledCover alt={title} src={cover} />
            </StyledCardMedia>
            <CardContent
              sx={{
                pt: 4,
                ...((latestPostLarge || latestPost) && {
                  bottom: 0,
                  width: '100%',
                  position: 'absolute',
                }),
              }}
            >
              <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {fDate(createdAt)}
              </Typography>

              <StyledTitle
                onClick={()=>{window.open(redirect, '_blank')}}
                color="inherit"
                variant="subtitle2"
                underline="hover"
                sx={{
                  ...(latestPostLarge && { typography: 'h5', height: 60 }),
                  ...((latestPostLarge || latestPost) && {
                    color: 'common.white',
                  }),
                }}
              >
                {title}
              </StyledTitle>
              <StyledDesc
                color="inherit"
                underline="hover"
                sx={{
                  ...(latestPostLarge),
                  ...((latestPostLarge || latestPost) && {
                    color: 'common.white',
                  }),
                }}
              >
                {description}
              </StyledDesc>             
            </CardContent>           
          </Card>
          {show}         
          
              
        </Grid>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="erase-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText align='justify' id="alert-dialog-description">
          This message is displayed to confirm the user's intention to delete a post. It is a warning message that alerts the user that the action cannot be undone and that the post will be permanently removed from the system. By clicking "Yes", the user confirms that they understand the consequences of their action and want to proceed with the deletion. Clicking "No" cancels the operation and close this dialog without making any changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false)}}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
          {msgSnack}
        </Alert>
      </Snackbar>
    </>
  );
}
