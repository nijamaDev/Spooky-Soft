import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { GoogleLogin } from '@leecheuk/react-google-login';
// @mui
import { Box, Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import SetCookie from '../../hooks/setCookie';
import RemoveCookie from '../../hooks/removeCookie';
// components
import { AppContext } from '../../context/AppContext';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const { login, setLogin } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

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
    console.log('success:', res);
  };

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      default:
        console.log('Create the respective handleInput');
        break;
    }
  };
  const handleClick = () => {
    const obj = {
      email,
      password,
    };
    axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/login/`, obj).then((res) => {
      const resUser = res.data.user;
      if (res.data.status === 1) {
        axios
          .post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/get_person/`, { id: resUser.person_id })
          .then((response) => {
            const person = response.data;
            setLogin({
              ...resUser,
              name: person.name,
              lastname: person.lastname,
              identification: person.identification,
            });
            RemoveCookie('usrin');
            if (remember) {
              SetCookie(
                'usrin',
                JSON.stringify({
                  ...resUser,
                  name: person.name,
                  lastname: person.lastname,
                  identification: person.identification,
                })
              );
              console.log({
                ...resUser,
                name: person.name,
                lastname: person.lastname,
                identification: person.identification,
              });
            }
          });
        navigate('/dashboard', { replace: true });
      } else {
        setOpen(true);
      }
    });

    // console.log(remember)
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
      <GoogleLogin
        clientId={clientId}
        buttonText="Log In with Google"
        onSuccess={onSuccess}
        onFailure={()=>setOpen(true)}
        cookiePolicy={'single_host_origin'}
        isSignedIn
      />
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
      <Stack spacing={3}>
        <TextField id="email" label="Email address" name="email" value={email} onChange={handleInputChange} />

        <TextField
          id="password"
          label="Password"
          name="password"
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Box>
          <Checkbox
            name="remember"
            label="Remember me"
            checked={remember}
            onChange={() => {
              setRemember(!remember);
            }}
          />
          Remember me.
        </Box>

        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Datos inválidos. Por favor, intente nuevamente.
        </Alert>
      </Snackbar>
    </>
  );
}
