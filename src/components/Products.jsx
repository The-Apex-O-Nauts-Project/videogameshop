import React, {useEffect} from "react";
import {Link} from "react-router-dom"
import { fetchAllProducts, fetchProductsById } from "../axios-services/products";
import Button from '@mui/material/Button';
import "../style/Product.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SingleProduct from "./SingleProduct";
import { getAddToCart } from "../axios-services/cart";

function Products(props){
    const {
        user,
        setSingleProduct,
        setProducts,
        products,
        navigate,
        setCartUserId,
        setProductId,
        quantity,
        total,
        cartUserId,
        productId,
        setQuantity,
        setTotal
    } = props
   
    const defaultTheme = createTheme()

    useEffect(() => {
        async function AllProducts(){
            const response = await fetchAllProducts();
            const result = response.products
            console.log("This is all the products", result)
            setProducts(result)
        }
        AllProducts();
    }, [])
    function handleScrollToTop(ev){
      ev.preventDefault()
        window.scrollTo({
          top:0,
          behavior:"smooth"
        })

    }
    
    async function handleAddToCart(){

      console.log("This is the user id", user.id)
      const results = await getAddToCart(cartUserId, productId)
      //console.log(results)
    }
   
        return( 
    <ThemeProvider theme={defaultTheme} >
        <Container  sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={7}>
          {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
             <Card
                sx={{ height: '100%', display: 'flex', 
                flexDirection: 'column', boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', 
                marginTop: '-10px',}
                }}
                style={{backgroundColor:"rgb(107,118,86)"}}
                onClick={() => {
                    setSingleProduct(product)
                    navigate(`/single-product/${product.id}`)
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={product.photourl}
                    />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                   {product.name}
                  </Typography>
                  <Typography>
                   {product.description}
                  </Typography>
                  <Typography>
                    Price: ${product.price}
                  </Typography>
                  <Typography>
                    {product.category.slice(1,-1).replace(/"/g, '')}
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
                      
              </Card>
              <Box style={{padding:"15px", }}>
              <Button size="small"  type="submit"  variant="contained" 
              style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
              background:"rgb(107,118,86)", 
              '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
              backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
              }}
              onClick={()=>{handleAddToCart(), setCartUserId(user.id), setProductId(product.id)}} 
              startIcon={<AddShoppingCartIcon/>}>Add to cart</Button>
              </Box>
        </Grid>
          ))}
        </Grid>
          <Box style={{padding:"50px", }} component="form" onSubmit={handleScrollToTop} noValidate sx={{ mt: 1 }}>
            <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt:3, mb: 2}}
            style={{background:"rgb(107,118,86)", 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', "&hover":{
              boxShadow:"0 10px 10px", marginTop: "-10px"
            }}}
            >Scroll to Top</Button>
           </Box>   
      </Container>
      
    </ThemeProvider>
    )
}

export default Products