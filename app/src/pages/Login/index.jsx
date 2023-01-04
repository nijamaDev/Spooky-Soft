import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Tabs, Tab, Box } from '@mui/material';
// Google Login
import Google from '../../components/google-login';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
// sections
import LoginForm from './LoginForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
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
        <title> Login | Minimal UI </title>
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

        <Stack sx={{paddingTop:{xs: 8, sm: 5} }} fullWidth
        style={{ display: 'flex' }}>        
          <Tabs 
            value={value} onChange={handleChange} sx={{paddingRight:{xs: 0, sm: 80} }}>
            <Tab label="Sign in" />
            <Tab label="Log in" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Container maxWidth="sm">
              <StyledContent>
                <Typography variant="h4" gutterBottom>
                  Sign in to One Market
                </Typography>

                <Typography variant="body2" sx={{ mb: 5 }}>
                  Don't have a business account? {''}
                  <Link variant="subtitle2">Contact support</Link>
                </Typography>

                <Google />
                {/* <Stack direction="row" spacing={2}>
                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                    <Google />
                  </Button>

                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                  </Button>

                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
                  </Button>
                </Stack> */}

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                  </Typography>
                </Divider>

                <LoginForm />
              </StyledContent>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container maxWidth="sm">
              <StyledContent>
                <Typography variant="h4" gutterBottom>
                  Log in to One Market
                </Typography>

                <Typography variant="body2" sx={{ mb: 5 }}>
                  Don't have a business account? {''}
                  <Link variant="subtitle2">Contact support</Link>
                </Typography>

                <Google />
                {/* <Stack direction="row" spacing={2}>
                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                    <Google />
                  </Button>

                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                  </Button>

                  <Button fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
                  </Button>
                </Stack> */}

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                  </Typography>
                </Divider>

                <LoginForm />
              </StyledContent>
            </Container>
          </TabPanel>
        </Stack>
        
      </StyledRoot>
    </>
  );
}
