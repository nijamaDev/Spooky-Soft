import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
// @mui
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
// context
import { AppContext } from '../../context/AppContext';

// components
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductSort from './ProductSort';
import ProductList from './ProductList';
// import ProductCartWidget from './ProductCartWidget'

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { update, login } = useContext(AppContext);
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  // {"id":7,"product":{"id":8,"name":"Sliders 005 Slider designs. (x 1)","description":"Designed to be both stylish and comfortable. These shoes are crafted using premium materials and feature a unique and customizable design. The sliders come in a variety of colors to choose from, and have a production order reference number that can be accessed through a specific URL. They also feature a cover image, a description, a redirect link, and a price.","cover":"https://www.laxn.co.uk/wp-content/uploads/2022/04/46ccd791-6f05-49bb-a40a-bcb9feeb4819.png","redirect":"https://www.laxn.co.uk/product/custom-ef24d530-3883-4e84-b91a-961a35c6e376/","price":99.99,"priceSale":69.99,"location":"Payasito","creation_date":"2023-01-14","colors":"#FF5733,#1586D3","store":3},"date":"2023-01-15","visits":1,"redirect":2}
  useEffect(() => {
    if (login.found !== 'waiting') {
      if (!login.found) {
        navigate('/login');
      }
    }
  }, [login]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/today_product_registers/`).then((res) => {
      setProducts(res.data);
      // console.log(products);
    });
  }, [update]);

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
        <Box pt={3} pb={3} ml={'-7%'} mt={'-4%'} mb={{ xs: '0%', md: '-31%' }} mr={'-7%'}>
          <img style={{ width: '100%', height: '100%' }} src={'/assets/images/products/cover.png'} alt="React Logo" />
        </Box>
        <Typography variant="h1" color={{ xs: '#7012b3', md: '#FFD600' }} pr={{ xs: '0%', md: '45%' }}>
          Products
        </Typography>
        <Typography
          color={{ xs: 'grey', md: 'white' }}
          variant="h3"
          pr={{ xs: '0%', md: '45%' }}
          pb={{ xs: '0%', md: '2%' }}
        >
          Step up your style
          <br />
          with our shoes!
        </Typography>
        <Box pb={{ xs: '0%', md: '20%' }} />
        {/*
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
        */}

        <ProductList products={products} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
