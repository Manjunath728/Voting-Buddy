import { Avatar, Button, Grid, Paper, TextField, Typography ,Box} from '@mui/material'
import React, { useEffect } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
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

function AdminLogin() {

    const navigate=useNavigate()
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit,setIsSubmit]=useState(false)
    const [user,setUser]=useState({
        userName:"",
        password:"",
        confirmPassword:""
    })
    
    function handleChange(event) {
        const { name, value } = event.target;
    
        setUser((prevValue) => ({
          ...prevValue,
          [name]: value
        }));
        
      }
    const handleSubmit= async(e)=>{
        e.preventDefault();
    setFormErrors(validate(user))
    setIsSubmit(true)
        
      }
    const handlePost= async()=>{
        const config={
          header:{
              "content-Type":"application/json"
          }
          
        }
        try {
          const {data}=await axios.post("http://localhost:5000/api/admin/login",user,config)
          localStorage.setItem("authToken",data.token)
          if(data.sucess===true){
            toast.success("Sucessfully Logged In", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              navigate("/admin/dashboard")
          }
          
        } catch (error) {
          
          toast.error(error.response.data.error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setUser((prevValue) => ({
              ...prevValue,
              "password": "",
              "confirmPassword":""
            }));
            
          
        }
      }
    useEffect(()=>{
        if(Object.keys(formErrors).length===0&&isSubmit){
            
          handlePost()
        }
        if(Object.keys(formErrors).length!==0&&isSubmit){
          toast.error("please enter every details corectly", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      },[formErrors])
    
      const validate = (values) => {
        const errors = {} 
        if (!values.userName) {
          errors.email = "userName is required....!"
        }
        if (!values.password) {
          errors.password = "password is required....!"
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = "please confirm password....!"
        }else if(values.password!==values.confirmPassword){
          errors.confirmPassword = "password is not matched  ....!"
        }
        return errors
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
                </Avatar><h2 style={headerStyle}> Admin Log In</h2>
                <Typography variant='caption'>
                Enter User name and password to Log In
                </Typography>
            </Grid>
            <form   onSubmit={handleSubmit}>
                <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.email}</Typography>} name="userName"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="User Name" variant="standard" placeholder='Enter your user Name' value={user.userName}  />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.password}</Typography>}name="password"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Password" variant="standard" placeholder='Enter password' type="password"value={user.password} />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.confirmPassword}</Typography>} name="confirmPassword"  onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Confirm Password" variant="standard" placeholder='Confirm your Password'type="password" value={user.confirmPassword}/>
                <Grid  align="center" margin={4}>
                <Button  variant="contained" color='primary' type="submit" style={{color:"white" ,width:"50%"}} >Log In</Button>
                </Grid>
                
                
            
             

                </ThemeProvider>
            </form>
        </Paper>
    </Grid>
</Box>

</>  
  )
}

export default AdminLogin