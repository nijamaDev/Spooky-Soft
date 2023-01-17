import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import { AppContext } from '../../context/AppContext';
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { login } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [dashLay, setDashLay] = useState(<></>);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('login', login);
    if (login.found !== 'waiting') {
      if (!login.found) {
        // console.log('login',login)
        navigate('/login');
      } else if (login.role.name === 'Visitante') {
        navigate('/products');
      }
    }
  }, [login]);

  return login == null ||
    login.role == null ||
    !login.found ||
    (login.role.name !== 'Operario' && login.role.name !== 'Administrador') ? (
    <></>
  ) : (
    <>
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </>
  );
}
