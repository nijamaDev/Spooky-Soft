import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
// components
import { FormContainer, FormItem, Selector } from '../../components/Forms';
import BlogPostCard from '../Blog/BlogPostCard';

// ----------------------------------------------------------------------

export default function EditNew() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState(state.title);
  const [createdAt, setCreatedAt] = useState(state.createAt);
  const [description, setDescription] = useState(state.description);
  const [cover, setCover] = useState(state.cover);
  const [redirect, setRedirect] = useState(state.redirect);
  const phone = 12;
  const computer = 6;

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const obj = {
      title,
      createdAt,
      description,
      cover,
      redirect
    }
    console.log(obj)
    axios.patch(`http://localhost:8000/basic/api/news/${state.id}/`,obj).then((res) => {
      console.log(res.data);
      if(res.data.id !== undefined){    
        navigate('/dashboard/blog');
      }else{
        setOpen(true);
      }  
    })
  };

  const handleInputChange = ({ target }) => {
    setCreatedAt(new Date().toISOString().slice(0, 10))
    switch (target.id) {
      case 'title':
        setTitle(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
      case 'cover':
        setCover(target.value);
        break;
      case 'redirect':
        setRedirect(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Edit post | One Market </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom pb={3}>
          Create post
        </Typography>

        <Card>
          <Box pt={3} pb={3} pr={3} onSubmit={handleSubmit} component="form">
            <FormContainer>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="title" label="Title" value={title} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="cover" label="Link to image" value={cover} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="description" label="Short Description" value={description} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="redirect" label="Link to redirect" value={redirect} onChange={handleInputChange} />
              </FormItem> 
              <Grid item xs={phone} sm={12}>
                <Typography variant='h5' gutterBottom>
                Preview
                </Typography>  
              </Grid>            
              <BlogPostCard post={{cover, title, description, redirect, createdAt}} index={0}/>
              <BlogPostCard post={{cover, title, description, redirect, createdAt}} index={1}/>
              <BlogPostCard post={{cover, title, description, redirect, createdAt}} index={3}/>
              <FormItem phone={phone} computer={12}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  pt={3}
                >
                  <Button variant="contained" color="secondary" type="submit">
                    Edit post
                  </Button>
                </Box>
              </FormItem>
              
            </FormContainer>
          </Box>
        </Card>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An error has ocurred.
        </Alert>
      </Snackbar>
    </>
  );
}
