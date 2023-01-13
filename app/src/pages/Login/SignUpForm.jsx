import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { FormContainer, FormItem, Selector } from '../../components/Forms';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const [status, setStatus] = useState(1);

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case 'id':
        setId(target.value);
        break;
      case 'name':
        setName(target.value);
        break;
      case 'lastname':
        setLastname(target.value);
        break;
      case 'email_s':
        setEmail(target.value);
        break;
      case 'password_s':
        setPassword(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, name, lastname, email, password, role, status);
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/users/`).then((res) => {
      console.log(res.data);
    });
    console.log('?');
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box onSubmit={handleSubmit} component="form">
      <Stack spacing={3}>
        <TextField
          id="email_s"
          required
          label="Email address"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <TextField id="id" required label="ID" name="ID" value={id} onChange={handleInputChange} />

        <TextField required id="name" label="Name" value={name} onChange={handleInputChange} />

        <TextField required id="lastname" label="Lastname" value={lastname} onChange={handleInputChange} />

        <TextField
          id="password_s"
          label="Password"
          name="password"
          required
          value={password}
          onChange={handleInputChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Datos inválidos. Por favor, intente nuevamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
