import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  // console.log(products)
  return (
    <Grid container spacing={3} {...other}>
      {products.map((register, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <ShopProductCard index={i} register={register} />
        </Grid>
      ))}
    </Grid>
  );
}
