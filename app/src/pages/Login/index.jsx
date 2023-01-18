import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Stack, Tabs, Tab, Box } from '@mui/material';
// Google Login
// import Google from '../../components/google-login';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
// import Iconify from '../../components/iconify';
// sections
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Login | One Market </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, pt: 10, pb: 5 }}>
              One Market | Login
            </Typography>
            <img src="/assets/illustrations/login.png" alt="login" />
          </StyledSection>
        )}

        <Stack sx={{ paddingTop: { xs: 8, sm: 8 } }} style={{ display: 'flex' }}>
          <Tabs value={value} onChange={handleChange} sx={{ paddingRight: { xs: 0, sm: 30 } }}>
            <Tab label="Sign up" />
            <Tab label="Log in" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Container maxWidth="sm">
              <StyledContent>
                <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
                  Sign up to One Market
                </Typography>

                {/* <Typography variant="body2" sx={{ mb: 5 }}>
                  Don't have a business account? {''}
                  <Link variant="subtitle2">Contact support</Link>
                </Typography> */}

                <SignUpForm />
              </StyledContent>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container maxWidth="sm">
              <StyledContent>
                <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
                  Log in to One Market
                </Typography>

                {/* <Typography variant="body2" sx={{ mb: 5 }}>
                  Don't have a business account? {''}
                  <Link variant="subtitle2">Contact support</Link>
                </Typography> */}

                <LoginForm />
              </StyledContent>
            </Container>
          </TabPanel>
        </Stack>
      </StyledRoot>
    </>
  );
}
