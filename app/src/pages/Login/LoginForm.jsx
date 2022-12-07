import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import SetCookie from '../../hooks/setCookie'
import RemoveCookie from '../../hooks/removeCookie'
// components
import { AppContext } from '../../context/AppContext';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);


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
    console.log("ola")
    axios.get("http://localhost:8000/basic/api/users/").then((res) => {
      console.log(res.data);
    })
    /*
    console.log(remember)
    if(email === 'admin@gmail.com' && password === 'admin'){      
      if(remember){
        SetCookie('usrin',JSON.stringify({
          name:'admin',
          email:'admin@gmail.com',
          password:'admin',
          role:'1'}))
      }else{
        RemoveCookie('usrin')
      }      
      navigate('/dashboard', { replace: true });
    }else{
      setOpen(true);
    }      
    */
     
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
        <Checkbox name="remember" label="Remember me" checked={remember} onChange={()=>{setRemember(!remember)}}/>
        <Link variant="subtitle2" underline="hover">
          Forgot password? {login.name}
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
