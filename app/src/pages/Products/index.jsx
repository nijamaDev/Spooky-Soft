import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

// components
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductSort from './ProductSort'
import ProductList from './ProductList'
// import ProductCartWidget from './ProductCartWidget'

// mock
import PRODUCTS from '../../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Products | One Market </title>
      </Helmet>

      <Container>
        <Box pt={3} pb={3} ml={"-7%"} mt={"-2.5%"} mb={{xs:"0%",md:"-31%"}} mr={"-7%"}>
          <img style={{ width: "100%", height: "100%" }} src={'https://www.domuz.com.co/wp-content/uploads/2022/12/Untitled-design.png'} alt="React Logo" />
        </Box>
        <Typography variant="h1" pr={{xs:"0%",md:"45%"}}>
          The best prices on the market
        </Typography>
        <Typography pb={{xs:"0%",md:"15%"}} pr={{xs:"0%",md:"45%"}}>
        Step into style with our unbeatable selection of shoes! From the streets to the office, our shoes are the perfect fit for any occasion!
        </Typography>

        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={3}>
          <img src={'https://www.domuz.com.co/wp-content/uploads/2022/12/ONE-MARKET-4.png'} alt="React Logo" />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography pt={2} pb={2} align="justify">
            Are you ready to elevate your shoe game? Look no further than our collection of fashionable and comfortable footwear. We offer a variety of styles to choose from, so you can find the perfect pair to suit your personal style. From the office to a night out on the town, our shoes are the perfect addition to any outfit. Don't miss out on the opportunity to upgrade your shoe collection. Shop now and step up your style!            
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} p={3}>
              <Button variant="contained" sx={{backgroundColor: "#4267B2",}}>
                <FacebookIcon />
              </Button>
              <Button variant="contained" sx={{backgroundColor: "#1DA1F2",}}>
                <TwitterIcon />
              </Button>
              <Button variant="contained" sx={{backgroundColor: "#FF0000",}}>
                <YouTubeIcon />
              </Button>
            </Stack>
            <Button variant="contained" sx={{backgroundColor: "#FF0000",}} onClick={()=>navigate('/login')}>
              <YouTubeIcon />aa
            </Button>
            
          </Grid>
        </Grid>
        <Typography variant="h3" align="center" sx={{ mb: 2 }}>
          All products
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        
        <ProductList products={PRODUCTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
