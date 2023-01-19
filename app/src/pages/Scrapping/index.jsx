import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Divider, LinearProgress, MenuItem, Select, Stack, TextField, Typography, InputLabel, Chip, Grid } from '@mui/material';

// components
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductSort from './ProductSort'
import ProductList from './ProductList'
import { AppContext } from '../../context/AppContext';
// import { Troubleshoot } from '@mui/icons-material';
// import ProductCartWidget from './ProductCartWidget'

// mock
// import PRODUCTS from '../../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const navigate = useNavigate();
  const { scrapping, setScrapping } = useContext(AppContext);
  const [ state, setState] = useState('Select your search to start :)');
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('Niñas');
  const [store, setStore] = useState('Croydon');
  const [other, setOther] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
    if(category === 'Personalizada'){setOther('')}
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

  const importProducts = () => {
    console.log('imported:',scrapping)
    console.log('products:',products)
    const obj = []
    
    for (let i = 0; i < scrapping.length; i += 1) {
      if(scrapping[i]){
        obj.push(products[i])
      }      
    }

    console.log('sending to db:',obj)
    
    axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/create_products/`,{products:obj}).then((res) => {
      console.log(res.data)
      setState(`Done! Created: ${res.data.created} Updated: ${res.data.updated}`)
      setProducts([])
    })
    
    

  }

  const handleButtonClick = () => {
    // `${process.env.REACT_APP_BACK_ADDRESS}/basic/api/today_product_registers/`
    setShowProgress(true)
    setState('Extracting some cool products :D')
    const scrappingProducts = []
    const obj = {
      "tipo":category,
      "prompt":other,
      "store": store
    }

    try {
      axios.post(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/scrap/`,obj).then((res) => {
      setShowProgress(false)
      if(res.data.status === 1){setState('Here is what I found :)')} 
      else { setState('Seems like the search did not throw any result :(') }

      const aux = res.data.elements
      console.log('Scrapping:',res.data)
      for (let i = 0; i < aux.length; i += 1) {
        if(aux[i].priceSale === null){
          scrappingProducts.push({...aux[i],price:parseInt(aux[i].price.replace(/\./g, ""),10)})
        } else scrappingProducts.push({...aux[i],price:parseInt(aux[i].price.replace(/\./g, ""),10),priceSale:parseInt(aux[i].priceSale.replace(/\./g, ""),10)})
      }

      setProducts(scrappingProducts)
      // console.log(scrappingProducts)
      setScrapping(Array(scrappingProducts.length).fill(true))
      // console.log('scrapping',scrapping)
    })  
    } catch (error) {
      console.log('error')
      setShowProgress(false)
    }
    
  }

  return (
    <>
      <Helmet>
        <title> Scrapping | One Market </title>
      </Helmet>

      <Box>
        <Typography variant="h3" align="center" sx={{ pb: 2, pt:5 }}>
          Scrapping
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction='column' p={10} spacing={2}>
          <InputLabel>Select a store</InputLabel>
          <Select value={store} onChange={(e)=>{setStore(e.target.value)}}>            
            <MenuItem value="Croydon">Croydon</MenuItem>
            <MenuItem value="Falabella">Falabella</MenuItem>
          </Select>
          <InputLabel>Select a category</InputLabel>
          <Select value={category} onChange={handleChange}>            
            <MenuItem value="Niñas">Girls</MenuItem>
            <MenuItem value="Niños">Boys</MenuItem>
            <MenuItem value="Personalizada">Other</MenuItem>
          </Select>
          {category !== 'Personalizada' ? false : true && <TextField disabled={category !== 'Personalizada'} id="other" label="Which?" value={other} onChange={handleInputChange}/>}
          
          <Stack pt={2} direction='row' spacing={3}>
            <Button variant='contained' onClick={handleButtonClick}>Scrapping!</Button>
            <Grid container>
              <Grid item xs={12}>             
              <Divider><Chip label={state} /></Divider>
              </Grid>
            </Grid>
          </Stack>
          {showProgress && <LinearProgress />}
          
          <Box p={2}>
          <ProductList products={products} />
          </Box>
          
          <Button variant='contained' onClick={importProducts}>
            Import Products
          </Button>
        </Stack>
        

        

        {/* <ProductCartWidget /> */}
      </Box>
      
    </>
  );
}
