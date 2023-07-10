import React from "react"
import { Container, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

function SingleProduct(props) {
const {navigate, singleProduct, setSingleProduct} = props    
   
return (
    <Container maxWidth="sm" 
    sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"center",
    }}>
    <Typography variant="h3">{singleProduct.name}</Typography>
    <img src={singleProduct.photourl} style={{width:"450px", height:"auto"}}/>
    <Typography variant="h5">{singleProduct.description}</Typography>
    <Typography variant="h4">${singleProduct.price}</Typography>
    <Typography variant="h4">{singleProduct.category}</Typography>
    </Container>

)
}
  
  
  export default SingleProduct;