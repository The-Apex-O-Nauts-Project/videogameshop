import React from "react"
import { Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SingleProduct(props) {
const {navigate, singleProduct, setSingleProduct} = props    

async function handleAddToCart() {
  console.log("This is the user",user.id)
  try {
    const result = await getAddToCart(
      productName,
      productPrice,
      productDescription,
      quantity,
      user.id, 
      productId
    );
  //  setCart(result)
   
  } catch (error) {
    console.error("An error occurred while adding product to cart:", error);
  }
}
   
return (
  <Container maxWidth="sm" sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "45px",
  }}
  style={{
    boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
    background:"rgb(190,210,175)", 
  }}
  >
    <img src={singleProduct.photourl} style={{ width: "450px", height: "auto" }} alt={singleProduct.name} />
    <Typography variant="h3" sx={{display:"felx", margin:"20px"}}>{singleProduct.name}</Typography>
    <Typography variant="h5">Game Description: {singleProduct.description}</Typography>
    <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" component="span" sx={{ mr: 2 }}>Price: ${singleProduct.price}</Typography>
      <Typography variant="h5" component="span">Category: {singleProduct.category.slice(1,-1).replace(/"/g, '')}</Typography>
    </Box>
    <Box component="form" onSubmit={handleAddToCart} noValidate sx={{ mt: 3 }}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
        background:"rgb(107,118,86)", 
        '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
        backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
        }}
        startIcon={<AddShoppingCartIcon />}
        onClick={()=>{
          handleAddToCart(), 
          setCartUserId(user.id), 
          setProductId(product.id),
          setProductName(product.name),
          setProductPrice(product.price),
          setProductDescription(product.description)
        }}>
        Add To Cart
      </Button>
    </Box>
  </Container>
  

)
}
  
  
  export default SingleProduct;