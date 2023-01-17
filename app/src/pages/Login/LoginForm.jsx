import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import { GoogleLogin } from '@leecheuk/react-google-login';
// @mui
import {
  Box,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
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
import { AppContext } from '../../context/AppContext';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const { setLogin } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setRemember(true);
    const obj = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    onLogin(obj);
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

  const loginButton = () => {
    const obj = {
      email,
      password,
    };
    onLogin(obj);
  };

  const onLogin = (obj) => {
    axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/login/`, obj).then((res) => {
      const user = res.data.user;
      console.log(res.data);
      if (res.data.status !== 1) {
        setOpen(true);
      } else {
        setDisplay(false);
        try {
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

                      console.log('login', {
                        ...user,
                        person,
                        role,
                        status,
                        found: true,
                      });
                      if (status.name !== 'Activo') {
                        setOpen(true);
                        setDisplay(true);
                        return;
                      }
                      setLogin({
                        ...user,
                        person,
                        role,
                        status,
                        found: true,
                      });
                      RemoveCookie('usrin');
                      if (remember) {
                        SetCookie(
                          'usrin',
                          JSON.stringify({
                            ...user,
                            person,
                            role,
                            status,
                          })
                        );
                      }
                      console.log(role.name);
                      if (role.name === 'Visitante') {
                        navigate('/products', { replace: true });
                      } else {
                        navigate('/dashboard', { replace: true });
                      }
                    });
                });
            });
        } catch (error) {
          console.error(error);
        } finally {
          console.log('');
        }
      }
    });
  };

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
          buttonText="Log In with Google"
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

        <LoadingButton fullWidth size="large" variant="contained" onClick={loginButton}>
          Login
        </LoadingButton>
      </Box>

      <LinearProgress sx={{ display: display ? 'none' : 'block' }} />

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Datos inválidos. Por favor, intente nuevamente.
        </Alert>
      </Snackbar>
    </>
  );
}
