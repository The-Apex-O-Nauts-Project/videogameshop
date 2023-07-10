import React from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createProduct } from "../axios-services/products"

function CreateProduct(props){
    const {
        setName,
        name,
        setDescription,
        description,
        setPrice,
        price,
        setPhotoUrl,
        photourl,
        setCategory,
        category,
        navigate
    } = props
    const product ={ name, description, price, photourl, category}
    const defaultTheme = createTheme()
    async function handleSubmit(ev){
        try{

            ev.preventDefault();
            const result = await createProduct(product);
            if(result.success){
                setName("")
                setDescription("")
                setPrice()
                setPhotoUrl("")
                setCategory("")
            }
            navigate("/Products")

        }catch(err){
            console.error("There was an Error creating a product")
            throw err
        }
    }
    function handleHome(){
        navigate("/")
    }
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Typography component="h1" variant="h5">
                Create Product
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={(ev)=> setName(ev.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={(ev)=> setDescription(ev.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="photourl"
                  label="Photourl"
                  type="text"
                  id="photourl"
                  onChange={(ev)=> setPhotoUrl(ev.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  onChange={(ev)=> setPrice(ev.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="category"
                  label="Category"
                  type="text"
                  id="category"
                  onChange={(ev)=> setCategory(ev.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Product
                </Button>
              </Box>
              <Box component="form" onSubmit={handleHome} noValidate sx={{ mt: 1 }}>
                <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt:3, mb: 2}}>
                    Home
                </Button>
               </Box>   
            </Box>
          </Container>
        </ThemeProvider>
      );
}
export default CreateProduct