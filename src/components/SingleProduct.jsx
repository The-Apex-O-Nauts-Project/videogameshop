import React from "react"
import { Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SingleProduct(props) {
const {navigate, singleProduct, setSingleProduct} = props    

function handleAddToCart(){

}
   
return (
  <Container maxWidth="sm" sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <Typography variant="h3">{singleProduct.name}</Typography>
    <img src={singleProduct.photourl} style={{ width: "450px", height: "auto" }} alt={singleProduct.name} />
    <Typography variant="h5">{singleProduct.description}</Typography>
    <Typography variant="h4">${singleProduct.price}</Typography>
    <Typography variant="h4">{singleProduct.category}</Typography>
    <Box component="form" onSubmit={handleAddToCart} noValidate sx={{ mt: 3 }}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        startIcon={<AddShoppingCartIcon/>}
      >
        Add To Cart
      </Button>
    </Box>
  </Container>

)
}
  
  
  export default SingleProduct;