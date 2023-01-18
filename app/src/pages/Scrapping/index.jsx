import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
// @mui
import { Box, Button, Container, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// components
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductSort from './ProductSort'
import ProductList from './ProductList'
// import ProductCartWidget from './ProductCartWidget'

// mock
// import PRODUCTS from '../../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([])
  const [value, setValue] = useState('Niñas');
  const [other, setOther] = useState('');
  // {"id":7,"product":{"id":8,"name":"Sliders 005 Slider designs. (x 1)","description":"Designed to be both stylish and comfortable. These shoes are crafted using premium materials and feature a unique and customizable design. The sliders come in a variety of colors to choose from, and have a production order reference number that can be accessed through a specific URL. They also feature a cover image, a description, a redirect link, and a price.","cover":"https://www.laxn.co.uk/wp-content/uploads/2022/04/46ccd791-6f05-49bb-a40a-bcb9feeb4819.png","redirect":"https://www.laxn.co.uk/product/custom-ef24d530-3883-4e84-b91a-961a35c6e376/","price":99.99,"priceSale":69.99,"location":"Payasito","creation_date":"2023-01-14","colors":"#FF5733,#1586D3","store":3},"date":"2023-01-15","visits":1,"redirect":2}

  useEffect(()=>{
    
    /*
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/today_product_registers/`).then((res) => {
      
      setProducts(res.data)
      console.log(products)
    })
    */
    
  }, [])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if(value === 'Personalizada'){setOther('')}
    
    
  };

  const handleInputChange = ({ target }) => {
    // setCreatedAt(new Date().toISOString().slice(0, 10));
    switch (target.id) {
      case 'other':
        setOther(target.value);
        break;
      default:
        console.log('Missing: handle');
    }
  };

  const handleButtonClick = () => {
    setProducts([{"id":7,"product":{"id":8,"name":"Sliders 005 Slider designs. (x 1)","description":"Designed to be both stylish and comfortable. These shoes are crafted using premium materials and feature a unique and customizable design. The sliders come in a variety of colors to choose from, and have a production order reference number that can be accessed through a specific URL. They also feature a cover image, a description, a redirect link, and a price.","cover":"https://www.laxn.co.uk/wp-content/uploads/2022/04/46ccd791-6f05-49bb-a40a-bcb9feeb4819.png","redirect":"https://www.laxn.co.uk/product/custom-ef24d530-3883-4e84-b91a-961a35c6e376/","price":99.99,"priceSale":69.99,"location":"Payasito","creation_date":"2023-01-14","colors":"#FF5733,#1586D3","store":3},"date":"2023-01-15","visits":1,"redirect":2}])
    console.log(`Selected value: ${value}`);
  }

  return (
    <>
      <Helmet>
        <title> Scrapping | One Market </title>
      </Helmet>

      <Container>
        <Typography variant="h3" align="center" sx={{ pb: 2, pt:5 }}>
          Scrapping
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction='column' p={10} spacing={2}>
          <Select value={value} onChange={handleChange}>            
            <MenuItem value="Niñas">Girls</MenuItem>
            <MenuItem value="Niños">Boys</MenuItem>
            <MenuItem value="Personalizada">Other</MenuItem>
          </Select>
          <Box width="100%" visibility={value !== 'Personalizada' ? 'hidden' : 'visible'}>
            <TextField disabled={value !== 'Personalizada'} id="other" label="Other" value={other} onChange={handleInputChange}/>
          </Box>
          <Button variant='contained' onClick={handleButtonClick}>
            Scrapping!
          </Button>
        </Stack>
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}/>
            <ProductSort />
          </Stack>
        </Stack>
        
        <ProductList products={products} />

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
