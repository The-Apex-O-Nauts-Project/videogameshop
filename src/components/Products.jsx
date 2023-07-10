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

function Products(props){
    const {
        setSingleProduct,
        setProducts,
        products,
        navigate
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
    function Copyright() {
      return (
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3001/">
            Apex Shop
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }
    function handleAddToCart(){

    }
   
        return( 
    <ThemeProvider theme={defaultTheme}>
        <Container sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={4}>
          {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
             <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                    ${product.price}
                  </Typography>
                  <Typography>
                    {product.category}
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleAddToCart} startIcon={<AddShoppingCartIcon/>}></Button>
                </CardActions>
                      
              </Card>
        </Grid>
          ))}
        </Grid>
          <Box component="form" onSubmit={handleScrollToTop} noValidate sx={{ mt: 1 }}>
            <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt:3, mb: 2}}
            >Scroll to Top</Button>
           </Box>   
      </Container>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
    )
}

export default Products