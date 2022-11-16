import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case 'email':
        setEmail(target.value);
        console.log(email);
        break;
      case 'password':
        setPassword(target.value);
        console.log(password);
        break;
      default:
        console.log('Necesitas crear el respectivo handleInput');
        break;
    }
  };
  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
    setOpen(true);
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
        <Checkbox name="remember" label="Remember me" />
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
