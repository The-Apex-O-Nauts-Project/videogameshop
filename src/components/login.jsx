import React from "react";
import { login } from "../axios-services/users";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from "@mui/material";

function Login(props){
    const{
        setUsername,
        username,
        setPassword,
        password,
        setToken,
        setIsLoggedIn,
        isLoggedIn,
        navigate,
        setIsAdmin,
        setUser
    }= props
    const defaultTheme = createTheme()
    async function handleSubmit(ev){
        try{

            ev.preventDefault()
            const user = props
        const results = await login(user)

        console.log("Login Results", results)
        if(!username.trim() && !password.trim()){
            alert("Please enter a username and password.");
            return;
        }
       
        if(results.success){
            console.log("Login Successful: ", user)
            setToken(results.token)
            setIsAdmin(user.isAdmin)
            window.localStorage.setItem("token", results.token)
            setIsLoggedIn(true)
            isLoggedIn(true)
            // setUser(user)
            console.log("Redirecting to home page...")
            setTimeout(() =>{navigate("/products")
            {isLoggedIn ? 
            <Alert severity="success">You have Logged in!</Alert> 
            : <Alert severity="error">Error logging in, please try again</Alert> }     
        },100)
      }
      
    }catch(err){
      
      console.error("Login failed")
      
    }
    
}
    function handleHome(){
        navigate("/")
    }
    return(
    <>
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
              Login 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
              <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={(ev)=> setUsername(ev.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(ev)=> setPassword(ev.target.value)}
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </Box>
            <Box component="form" onSubmit={handleHome} noValidate sx={{ mt: 1 }}>
                <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt:3, mb: 2}}
                >Home</Button>
            </Box>
            </Box>
        </Container>
      </ThemeProvider>
      </>    
    );
    


}
export default Login;