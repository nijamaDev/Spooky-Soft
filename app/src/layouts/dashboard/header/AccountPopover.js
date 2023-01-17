import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
// import account from '../../../_mock/account';
import RemoveCookie from '../../../hooks/removeCookie';

import { AppContext } from '../../../context/AppContext';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AppContext);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDash = () => {
    handleClose();
    navigate('/dashboard');
  };
  const handleBlog = () => {
    handleClose();
    navigate('/blog');
  };
  const handleProducts = () => {
    handleClose();
    navigate('/products');
  };

  const handleLogout = () => {
    RemoveCookie('usrin');
    navigate('/login', { replace: true });
    setOpen(null);
    setLogin({ found: false });
  };
  const MENU_OPTIONS = [
    {
      label: 'Dashboard',
      handle: handleDash,
    },
    {
      label: 'Blog',
      handle: handleBlog,
    },
    {
      label: 'Products',
      handle: handleProducts,
    },
  ];
  return login == null || login.found === 'waiting' || login.found === false ? (
    <></>
  ) : (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={login.imageUrl} alt="photoURL" sx={{ backgroundColor: '#ff0000' }}>
          {login.person.name[0]}
          {login.person.lastname[0]}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {login.person.name} {login.person.lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {login.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.handle}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
