import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import Logo from '../../components/logo';
import AccountPopover from '../dashboard/header/AccountPopover';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const HEADER_MOBILE = 64;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const StyledRootHeader = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
}));

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledRoot>
        <StyledRootHeader>
          <StyledToolbar>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <AccountPopover />
          </StyledToolbar>
        </StyledRootHeader>
        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </>
  );
}
