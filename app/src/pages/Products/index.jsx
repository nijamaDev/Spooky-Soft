import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Divider, Stack, Typography } from '@mui/material';

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
        <Typography variant="h3" align="center" sx={{ pb: 2, pt:5 }}>
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
