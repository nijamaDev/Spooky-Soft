import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { GoogleLogin } from '@leecheuk/react-google-login';
// @mui
import {
  Stack,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Divider,
  Typography,
  LinearProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import SetCookie from '../../hooks/setCookie';
import RemoveCookie from '../../hooks/removeCookie';
// components
import Iconify from '../../components/iconify';
import { FormContainer, FormItem, Selector } from '../../components/Forms';
import { AppContext } from '../../context/AppContext';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const { login, setLogin } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    // console.log('success:',res);
    // setRemember(true)
    const obj = {
      role: 'Visitante',
      status: 'Activo',
      imageUrl: res.profileObj.imageUrl,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      people: {
        identification: '',
        name: res.profileObj.givenName,
        lastname: res.profileObj.familyName,
      },
    };
    // console.log(obj)
    onSignUp(obj);
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

  const signButton = () => {
    const obj = {
      role: 'Visitante',
      status: 'Activo',
      imageUrl: '',
      email,
      password,
      people: {
        identification: id,
        name,
        lastname,
      },
    };
    console.log(obj);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email) || name === '' || lastname === '') {
      setOpen(true);
    } else {
      onSignUp(obj);
    }
  };

  const onSignUp = (obj) => {
    axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/create_user/`, obj).then((res) => {
      const user = res.data.user;
      if (res.data.status === 1) {
        setDisplay(false);
        axios
          .post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/get_person/`, { id: user.person_id })
          .then((response) => {
            const person = response.data;
            axios
              .post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/get_role/`, { id: user.role_id })
              .then((response) => {
                const role = response.data;
                axios
                  .post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/get_status/`, { id: user.status_id })
                  .then((response) => {
                    const status = response.data;
                    setLogin({
                      ...user,
                      person,
                      role,
                      status,
                      found: true,
                    });
                    RemoveCookie('usrin');
                    SetCookie(
                      'usrin',
                      JSON.stringify({
                        ...user,
                        person,
                        role,
                        status,
                      })
                    );
                    navigate('/dashboard', { replace: true });
                  });
              });
          });
        // console.log(remember)
      } else {
        setOpen(true);
      }
    });
  };

  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: display ? 'block' : 'none' }}>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In with Google"
          onSuccess={onSuccess}
          onFailure={() => setOpen(true)}
          cookiePolicy={'single_host_origin'}
        />
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>
        <Stack spacing={3}>
          <TextField
            id="email_s"
            required
            label="Email address"
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <TextField required id="name" label="Name" value={name} onChange={handleInputChange} />

          <TextField required id="lastname" label="Lastname" value={lastname} onChange={handleInputChange} />

          <TextField id="id" label="Identification" name="Identification" value={id} onChange={handleInputChange} />

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
          <LoadingButton size="large" variant="contained" onClick={signButton}>
            Sign Up
          </LoadingButton>
        </Stack>
      </Box>

      <LinearProgress sx={{ display: display ? 'none' : 'block' }} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Datos inválidos. Por favor, intente nuevamente.
        </Alert>
      </Snackbar>
    </>
  );
}
