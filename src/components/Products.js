import React, {useState, useEffect} from "react";
import { fetchAllProducts } from "../axios-services/products";
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

function Products(props){
    const {
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
    function handleHome(){
        navigate("/")

    }
    function handleAddToCart(){

    }
    return( 
    <ThemeProvider theme={defaultTheme}>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {products.map((product) => (
              <Grid item key={product} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                    {product.price}
                  </Typography>
                  <Typography>
                    {product.category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleAddToCart}>Add To Cart</Button>
                </CardActions>
              </Card>
        </Grid>
          ))}
        </Grid>
          <Box component="form" onSubmit={handleHome} noValidate sx={{ mt: 1 }}>
            <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt:3, mb: 2}}
            >Home</Button>
           </Box>   
      </Container>
    </ThemeProvider>
    )
}

export default Products