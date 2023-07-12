import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {register} from "../axios-services/users"

function Register(props){
    const {
        setToken,
        setIsLoggedIn,
        navigate,
        setUsername,
        setPassword,
        setEmail,
        email,
        emailError,
        setEmailError,
        username,
        usernameError,
        setUsernameError,
        passwordError,
        setPasswordError,
        password
    }= props
    const defaultTheme = createTheme()
    async function handleSubmit(ev){
        ev.preventDefault()
        const user = {username, password, email}
        if(!username.trim()){
            setUsernameError("Please Enter A Username")
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email) && !email.trim()){
          setEmailError("Please Enter A Valid Email Address")
          return
        }
        // if(!password || password.length < 4){
        //     alert("Password is too short, it must be atleast 4 charaters")
        //     return;
        // }
        console.log(user)
        const results = await register(user);
        console.log(results)

        if(results && results.token){
            const token = results.token;
            setToken(token)
            setIsLoggedIn(true)
            window.localStorage.setItem("token", token)
            navigate("/Login")
            
        }else{
            alert("There was an error registering")
            
        }
    }
    function handleHome(){
        navigate("/")
    }
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs" 
            style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
              background:"rgb(79,89,63)", 
              borderRadius: '8px',}}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Typography component="h1" variant="h5" style={{color:"white"}}>
                Sign Up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(ev)=> setEmail(ev.target.value)}
                error={Boolean(emailError)}
                helperText={emailError}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={(ev)=> setUsername(ev.target.value)}
                error={Boolean(usernameError)}
                helperText={usernameError}
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
                  sx={{ mt: 3, mb: 2 }}
                  style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                  background:"rgb(107,118,86)", 
                  '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                  backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
                  }}
                >
                  Sign up
                </Button>
              </Box>
              <Box component="form" onSubmit={handleHome} noValidate sx={{ mt: 1 }}>
                <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt:3, mb: 2}}
                style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 1)', 
                background:"rgb(107,118,86)", 
                '&:hover': {boxShadow: '0 10px 10px rgba(0, 0, 0, 1)', 
                backgroundColor: 'rgb(107, 118, 86, 0.8)', marginTop: '-10px',}
                }}
                >Home</Button>
               </Box>   
            </Box>
          </Container>
        </ThemeProvider>
      );
    }
   


export default Register