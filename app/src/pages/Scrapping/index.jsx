import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Divider, LinearProgress, MenuItem, Select, Stack, TextField, Typography, InputLabel } from '@mui/material';

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
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('Niñas');
  const [store, setStore] = useState('Croydon');
  const [other, setOther] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  useEffect(()=>{
    
    /*
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/today_product_registers/`).then((res) => {
      
      setProducts(res.data)
      console.log(products)
    })
    */
    
  }, [])

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
        
        if(products[i].priceSale === null){
          obj.push({...products[i],price:parseInt(products[i].price.replace(".",""),10)})
        } else obj.push({...products[i],price:parseInt(products[i].price.replace(".",""),10),priceSale:parseInt(products[i].priceSale.replace(".",""),10)})
      }      
    }

    console.log('sending to db:',obj)
    axios.post('https://onemarket.sncraft.online/basic/api/create_products/',{products:obj}).then((res) => {
      console.log(res.data)
    })

  }

  const handleButtonClick = () => {
    // `${process.env.REACT_APP_BACK_ADDRESS}/basic/api/today_product_registers/`
    setShowProgress(true)
    let scrappingProducts = []
    const obj = {
      "tipo":category,
      "prompt":other,
      "store": store
    }

    try {
      axios.post('https://onemarket.sncraft.online/basic/api/scrap/',obj).then((res) => {
      setShowProgress(false)
      scrappingProducts = res.data.elements
      setProducts(scrappingProducts)
      // console.log(scrappingProducts)
      setScrapping(Array(scrappingProducts.length).fill(true))
      // console.log('scrapping',scrapping)
    })  
    } catch (error) {
      console.log('error')
      setShowProgress(false)
    }
    

    /*
    scrappingProducts = [{"store":"Falabella","name":"Tenis Croydon Unisex Royal Hi-Cut Azul","description":"Croydon - Tenis Croydon Unisex Royal Hi-Cut Azul \nDisponible ahora. Por Croydon","price":"99.900","priceSale":null,"location":"5687175","redirect":"https://www.falabella.com.co/falabella-co/product/5687175/Tenis-Croydon-Unisex-Royal-Hi-Cut-Azul/5687176","cover":"https://falabella.scene7.com/is/image/FalabellaCO/5687176?wid=240&hei=240&qlt=70","colors":""},{"store":"Falabella","name":"Tenis Croydon Unisex Discovery Alto Azul","description":"Croydon - Tenis Croydon Unisex Discovery Alto Azul \nDisponible ahora. Por Croydon","price":"94.900","priceSale":null,"location":"5686886","redirect":"https://www.falabella.com.co/falabella-co/product/5686886/Tenis-Croydon-Unisex-Discovery-Alto-Azul/5686887","cover":"https://falabella.scene7.com/is/image/FalabellaCO/5686887?wid=240&hei=240&qlt=70","colors":" rgb(37, 47, 72); #121FFF;"},{"store":"Falabella","name":"Tenis deportivo Fratta Running Mujer Ida","description":"FRATTA - Tenis deportivo Fratta Running Mujer Ida \nDisponible ahora. Por Falabella","price":"119.990","priceSale":"299.990","location":"882500888","redirect":"https://www.falabella.com.co/falabella-co/product/882500888/Tenis-deportivo-Fratta-Running-Mujer-Ida/882500891","cover":"https://falabella.scene7.com/is/image/FalabellaCO/882500891?wid=240&hei=240&qlt.70","colors":" #3F556A"}]    
    setProducts(scrappingProducts)
    setScrapping(Array(scrappingProducts.length).fill(true))
    })  
    */
    
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
          
          <Button variant='contained' onClick={handleButtonClick}>
          Scrapping!
          </Button>
          {showProgress && <LinearProgress />}
        </Stack>
        

        <ProductList products={products} />

        {/* <ProductCartWidget /> */}
      </Box>
      <Button variant='contained' size='small' onClick={importProducts}>
        Import Products
      </Button>
    </>
  );
}
