import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
// components
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductSort from './ProductSort'
import ProductList from './ProductList'
// import ProductCartWidget from './ProductCartWidget'

// mock
import PRODUCTS from '../../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
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
        <title> Products </title>
      </Helmet>

      <Container>
        <Box pt={3} pb={3} ml={"-7%"} mt={"-2.5%"} mb={"-30%"} mr={"-7%"}>
          <img style={{ width: "100%", height: "100%" }} src={'https://www.domuz.com.co/wp-content/uploads/2022/11/landing_page.png'} alt="React Logo" />
        </Box>
        <Typography variant="h1" pr={"45%"}>
          The best prices on the market
        </Typography>
        <Typography mb={"15%"} pr={"45%"}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Typography>
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
