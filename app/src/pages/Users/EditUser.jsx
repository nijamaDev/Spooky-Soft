import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { FormContainer, FormItem, Selector } from '../../components/Forms';

export default function AlertDialog({ open, setOpen, user }) {
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(3);
  const [status, setStatus] = useState(3);
  const phone = 12;
  const computer = 6;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      id,
      name,
      lastname,
      email,
      password,
      role,
      status,
    });
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/update_user/${id}/`, {
        name,
        lastname,
        email,
        role,
        status,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
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
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      setId(user.id);
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      console.log('USE EFFECT ', user);
    }
  }, [open]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom pb={3}>
            Editing User
          </Typography>

          <Box pt={3} pb={3} pr={3} onSubmit={handleSubmit} component="form">
            <FormContainer>
              <FormItem phone={phone} computer={computer}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  value={id}
                  onChange={handleInputChange}
                  disabled={false}
                />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="name" label="Name" value={name} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  value={lastname}
                  onChange={handleInputChange}
                />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField required fullWidth id="email" label="Email" value={email} onChange={handleInputChange} />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handleInputChange}
                />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <Selector
                  idSelector="role"
                  labelSelector="Role"
                  id="role"
                  hook={role}
                  setHook={setRole}
                  arrayElements={[
                    {
                      id: 3,
                      name: 'Visitante',
                    },
                    {
                      id: 2,
                      name: 'Operario',
                    },
                    {
                      id: 1,
                      name: 'Administrador',
                    },
                  ]}
                  multiple
                />
              </FormItem>
              <FormItem phone={phone} computer={computer}>
                <Selector
                  idSelector="status"
                  labelSelector="Status"
                  id="status"
                  hook={status}
                  setHook={setStatus}
                  arrayElements={[
                    {
                      id: 3,
                      name: 'Activo',
                    },
                    {
                      id: 4,
                      name: 'Inactivo',
                    },
                    {
                      id: 5,
                      name: 'Suspendido',
                    },
                  ]}
                  multiple
                />
              </FormItem>
              <FormItem phone={phone} computer={12}>
                <Stack justifyContent="flex-end" direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                    style={{ backgroundColor: 'red' }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="secondary" type="submit">
                    Save Changes
                  </Button>
                </Stack>
              </FormItem>
            </FormContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
