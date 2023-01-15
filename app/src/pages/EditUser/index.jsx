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
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { FormContainer, FormItem, Selector } from '../../components/Forms';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
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
  return (
    <>
      <Helmet>
        <title> User Register | One Market </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom pb={3}>
          Editing User
        </Typography>

        <Card>
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
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" pt={3}>
                  <Button variant="contained" color="secondary" type="submit">
                    Save Changes
                  </Button>
                </Box>
              </FormItem>
            </FormContainer>
          </Box>
        </Card>
      </Container>
    </>
  );
}
