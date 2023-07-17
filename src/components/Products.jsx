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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getAddToCart } from "../axios-services/cart";
import { CoPresentOutlined } from "@mui/icons-material";


function Products(props){
    const {
      user,
      cart,
      setCart,
      setProducts,
      products,
      navigate,
      setSingleProduct,
      setProductName,
      productName,
      productPrice,
      productDescription,
      setProductPrice,
      setProductDescription,
      getCartByUserId,
      setCartUserId,
      setProductId,
      quantity,
      cartUserId,
      productId,
      setQuantity,
      currentPage,
      setCurrentPage,
      isLoggedIn
    } = props
    const productsPerPage= 6;
   
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
    const handleQuantityChange = (ev) =>{
      setQuantity(ev.target.value)
    }
    

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    //console.log(currentProducts)
    const paginate =(pageNumber)=>{
      //console.log(currentPage)
      setCurrentPage(pageNumber)

    }
    
    return( 
    <ThemeProvider theme={defaultTheme} >
        <Container  sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={7}>
          {currentProducts.map((product) => (
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
                  <Typography>Quantity</Typography>
                  <Select value={quantity} 
                  onChange={handleQuantityChange} sx={{ mr: 1 }}
                  onClick={(ev)=> ev.stopPropagation()}
                  >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                  </Select>
                </CardActions>
              </Card>
              <Box style={{padding:"15px", }}>
              <Button size="small"  type="submit"  variant="contained" 
              style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
              background:"rgb(107,118,86)", 
              '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
              marginTop: '-10px',}
            }}
              onClick={()=>{
                handleAddToCart(), 
                setCartUserId(user.id), 
                setProductId(product.id),
                setProductName(product.name),
                setProductPrice(product.price),
                setProductDescription(product.description)
                //setQuantity(product.quantity)
              }} 
              startIcon={<AddShoppingCartIcon/>}>Add to cart</Button>
              </Box>
        </Grid>
          ))}
        </Grid>
          <Box style={{padding:"50px", }} 
          component="form" onSubmit={handleScrollToTop} 
          noValidate 
          sx={{ mt: 1, justifyContent: "center"}}>
            {Array.from({length: Math.ceil(products.length / productsPerPage)}).map(
              (item, index) => (
                <Button key={index}
                onClick={()=> paginate(index+1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                style={{
                  textDecoration:"none", 
                  color:"white",
                  margin: "0 5px",
                  background:"rgb(107,118,86)", 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 1)'}}>
                  {index + 1}
                </Button>
              ))}
      
             
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