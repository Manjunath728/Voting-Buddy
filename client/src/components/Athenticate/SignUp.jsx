import { Avatar, Button, Grid, Paper, TextField, Typography,Box } from '@mui/material'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {ToastContainer,toast } from "react-toastify"
import axios from "axios"
const PaperStyle={
    padding:"30px 20px",width:500,margin:"20px auto"
}
const headerStyle={
    margin:0,
    fontFamily:"Carter One",
    fontSize:"48px"
}
const avatarStyle={
    backgroundColor:"#EC7700"
}
const textfieldStyle={
marginTop:20,
fontFamily:"Inter",

}

function SignUp() {
    const [matched,setmatch]=useState("")
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        organisationName:""
    })
    function handleChange(event) {
        const { name, value } = event.target;
    
        setUser((prevValue) => ({
          ...prevValue,
          [name]: value
        }));
        console.log(user);
      }
      function confirmPassword(event){
        const confirm=event.target.value
        if(confirm===user.password){
            setmatch("")
        }else {
            setmatch("password not matched")
        }

      }
      const handleSubmit= async(e)=>{
        e.preventDefault();
      }

      
  return (
    <Box
  display="flex"
  justifyContent="center"
  
  minHeight="100vh"
>
<Grid >
        <Paper elevation={20} style={PaperStyle}>
            <Grid align="center" margin={3}>
                <Avatar style={avatarStyle}>
                <AddCircleOutlineIcon />
                </Avatar><h2 style={headerStyle}>Sign Up</h2>
                <Typography variant='caption'>
                Please fill this form to Create account
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
                <TextField name="name"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Name" variant="standard" className="required"placeholder='Enter your Name' value={user.name} />
                <TextField name="email"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Email" variant="standard" placeholder='Enter your Email'type="email"value={user.email}  />
                <TextField name="password"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Password" variant="standard" placeholder='Enter password' type="password"value={user.password} />
                <TextField onChange={confirmPassword} helperText={matched} color='primary' style={textfieldStyle} fullWidth label="Confirm Password" variant="standard" placeholder='Confirm your Password'type="password" />
                <TextField name="organisationName"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Organization Name" variant="standard" placeholder='Enter your Organization Name'value={user.organisationName}  />
                <Grid  align="center" margin={4}>
               <Button  variant="contained" color='primary' type="submit" style={{color:"white" ,width:"50%"}} >Create  account</Button>
                </Grid>
                <Grid align="center" margin={0}>
                <Typography variant="h6">OR</Typography>
                </Grid>
                <Grid  align="center"  margin={2}>
                    <Link to="/login">
                <Button  variant="outlined" color='primary'  style={{color:"black" ,width:"50%"}} >Login</Button>
                </Link></Grid>

                </ThemeProvider>
            </form>
            <ToastContainer/>
        </Paper>
    </Grid>
</Box>
    
  )
}

export default SignUp