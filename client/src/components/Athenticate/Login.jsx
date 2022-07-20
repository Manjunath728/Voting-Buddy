import { Avatar, Button, Grid, Paper, TextField, Typography ,Box} from '@mui/material'
import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import BlankHeader from '../Blanks/BlankHeader';
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

function Login() {
    const [matched,setmatch]=useState("")
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const [ismatched,setIsMached]=useState(true)
    const [user,setUser]=useState({
        email:"",
        password:"",
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
           setIsMached(true)
        }else {
            setmatch("password not matched")
            setIsMached(false)
            
        }


      }
      const handleSubmit= async(e)=>{
        e.preventDefault();
        
        const config={
          header:{
              "content-Type":"application/json"
          }
          
        }
        try {
          const {data}=await axios.post("http://localhost:5000/api/auth/login",user,config)
          localStorage.setItem("authToken",data.token)
          if(data.sucess===true){
              navigate("/dashboard ")
          }
          
        } catch (error) {
          setError(error.response.data.error)
          setTimeout(()=>{setError("")},5000)
        }
      }
      
  return (<>
    
    <Box
  display="flex"
  justifyContent="center"
 
  minHeight="100vh"
>
<Grid>
        <Paper elevation={20} style={PaperStyle}>
            <Grid align="center" margin={3}>
                <Avatar style={avatarStyle}>
                <LoginIcon />
                </Avatar><h2 style={headerStyle}>Log In</h2>
                <Typography variant='caption'>
                Enter E-mail and password to Log In
                </Typography>
            </Grid>
            <form   onSubmit={handleSubmit}>
                <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
                <TextField name="email"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Email" variant="standard" placeholder='Enter your Email'type="email"value={user.email}  />
                <TextField name="password"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Password" variant="standard" placeholder='Enter password' type="password"value={user.password} />
                <TextField onChange={confirmPassword} helperText={matched} color='primary' style={textfieldStyle} fullWidth label="Confirm Password" variant="standard" placeholder='Confirm your Password'type="password" />
                <Grid  align="center" margin={4}>
                {error&&<span>{error}</span>}
                <Button  variant="contained" color='primary' type="submit" style={{color:"white" ,width:"50%"}} disabled={!ismatched} >Log In</Button>
                </Grid>
                <Grid align="center" margin={0}>
                <Typography variant="h6">OR</Typography>
                </Grid>
                <Grid  align="center"  margin={2}>
                <Link to="/signup"><Button  variant="outlined" color='primary' style={{color:"black" ,width:"50%"}} >Create  account</Button>
                </Link></Grid>

                </ThemeProvider>
            </form>
        </Paper>
    </Grid>
</Box>
</>  
  )
}

export default Login