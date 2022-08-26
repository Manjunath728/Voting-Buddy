import { Avatar, Button, Grid, Paper, TextField, Typography,Box } from '@mui/material'
import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
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

function VoterSignUp({history}) {
  const navigate=useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit,setIsSubmit]=useState(false)
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        phoneNumber:"",
        adharNumber:"",
        confirmPassword:""
    })
    const [CoustomError,setError]=useState("")
    function filterDigits(evt) {
      var event = evt || window.event;
      var val = event.target.value;
      var filtered = val.replace(/[^A-Za-z ]/g, '');
  
      if (filtered !== val) {
        event.target.value = filtered;
      }
    }
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
    const handlePost=async()=>{
        const config={
          header:{
              "content-Type":"application/json"
          }
          
        }
        try {
          const {data}=await axios.post("http://localhost:5000/api/userauth/register",user,config)
          localStorage.setItem("authToken",data.token)
          if(data.sucess===true){
            toast.success("Sucessfully Created Account and Logged  In", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              navigate("/voter/dashboard")
          }
          
        } catch (error) {
           setError(error.response.data.error)
          if(CoustomError==="duplicate Filed value enter"){
            setError("Entered email id already registerd try to login ")
          }else{
          toast.error(CoustomError, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });}}
          }
    
  useEffect(()=>{
    if(Object.keys(formErrors).length===0&&isSubmit){
      handlePost()
    }if(Object.keys(formErrors).length!==0&&isSubmit){
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
    const emailRegularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!values.name) {
      errors.name = "name is required....!"
    }
    if (!values.email) {
      errors.email = "email is required....!"
    }else if(!emailRegularExpression.test(values.email)){
      errors.email = " valid email is required....!"
    }
    if (!values.password) {
      errors.password = "password is required....!"
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)){
      errors.password=" password must contain Minimum eight characters, at least one letter and one number...!"
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "please confirm password....!"
    }else if(values.password!==values.confirmPassword){
      errors.confirmPassword = "password is not matched  ....!"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "phoneNumber is required....!"
    }else if(!/^\d{10}$/.test(values.phoneNumber)){
      errors.phoneNumber = "please enter 10 digit valid phone number....!"
    }
    
    if (!values.adharNumber) {
      errors.adharNumber = "adharNumber is required....!"
    }else if(!/^\d{12}$/.test(values.adharNumber)){
      errors.adharNumber = "please enter 12 digit valid Adhar number....!"
    }
    return errors
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
                </Avatar><h2 style={headerStyle}>Voter Sign Up</h2>
                <Typography variant='caption'>
                Please fill this form to Create account as Voter
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.name}</Typography>}  name="name"onChange={handleChange} onInput={filterDigits} color='primary' style={textfieldStyle} fullWidth label="Name" variant="standard" className="required"placeholder='Enter your Name' value={user.name} />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.email}</Typography>} name="email"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Email" variant="standard" placeholder='Enter your Email'value={user.email}  />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.phoneNumber}</Typography>} name="phoneNumber"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Phone Number" variant="standard" placeholder='Enter your phone Number' onWheel={e => e.target.blur()}type="number"value={user.phoneNumber}  />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.adharNumber}</Typography>} name="adharNumber"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="adhar Number" variant="standard" placeholder='Enter your adhar Number' onWheel={e => e.target.blur()}type="number"value={user.adharNumber}  />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.password}</Typography>} name="password"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Password" variant="standard" placeholder='Enter password' type="password"value={user.password} />
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.confirmPassword}</Typography>} name="confirmPassword"onChange={handleChange} color='primary' style={textfieldStyle} fullWidth label="Confirm Password" variant="standard" placeholder='Confirm your Password'type="password" value={user.confirmPassword} />
                <Grid  align="center" margin={4}>
                    
               <Button  variant="contained" color='primary' type="submit" style={{color:"white" ,width:"50%"}}>Create  account</Button>
                </Grid>
                <Grid align="center" margin={2}>
              Already signed Up  Then ?...
                <Link to="/voter/login">
                  <Button  color='primary'  >Login</Button>
                </Link></Grid>
                </ThemeProvider>
            </form>
            <ToastContainer/>
        </Paper>
    </Grid>
</Box>
    
  )
}

export default VoterSignUp