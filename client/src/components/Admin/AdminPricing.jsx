import React, { useEffect } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography ,Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {   useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast } from "react-toastify"
import useFetchPrice from "../hooks/useFetchPrice";
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


function AdminPricing() {
  const navigate=useNavigate()
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit,setIsSubmit]=useState(false)
    const [price,setPrice]=useState("")
    const { price: presentPrice, error } = useFetchPrice();
 

    
    
    function handleChange(event) {
        const { name, value } = event.target;
    
        setPrice(value);
        
      }
    const handleSubmit= async(e)=>{
        e.preventDefault();
    setFormErrors(validate(price))
    setIsSubmit(true)
        
      }
    const handlePost= async()=>{
        const config={
          headers:{
              "content-Type":"application/json",
              "Authorization": "Bearer " + localStorage.authToken
          }
          
        }
        try {
          const {data}=await axios.post("http://localhost:5000/api/admin/updateprice",{price},config)
          
          if(data.sucess===true){
            toast.success(data.message, {
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
    
      const validate = (price) => {
        const errors = {} 
        if (!price) {
          errors.email = "price is required....!"
        }else if(price<=0){
          errors.email = "price should be more than ZERO ....!"
        }
        return errors
      }
      
      
      if (presentPrice === null) {
        return <h1>Loading</h1>;
      }
      if (error) {
        console.log(error);
      }
    
      if (presentPrice === undefined) {
        return <h1>Loading.....</h1>;
      }
  return (
    <>
    
    <Box
  display="flex"
  justifyContent="center"
 
  minHeight="100vh"
>
<Grid>
        <Paper elevation={20} style={PaperStyle}>
            <Grid align="center" margin={3}>
                <Avatar style={avatarStyle}>
                <CurrencyRupeeIcon/>
                </Avatar><h2 style={headerStyle}> Update</h2><h2 style={headerStyle}>Price per voter</h2>
                <Typography variant='caption'>
               this is vote per price to used to caclulate amount during election
                </Typography>
            </Grid>
            <form   onSubmit={handleSubmit}>
              <Typography variant='h5' style={{color:"#EC7700"}}> Present Price is {presentPrice}</Typography>
                <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
                <TextField helperText={<Typography style={{color:"#EC7700"}}>{formErrors.price}</Typography>} name="pricePerVoter"onChange={handleChange}onWheel={(e) => e.target.blur()} color='primary' style={textfieldStyle} fullWidth label="Price per Voter" variant="standard" placeholder='enter price per voter' type={"number"} value={price}  />
                <Grid  align="center" margin={4}>
                <Button  variant="contained" color='primary' type="submit" style={{color:"white" ,width:"50%"}} >Update</Button>
                </Grid>
                
                
            
             

                </ThemeProvider>
            </form>
        </Paper>
    </Grid>
</Box>

</>  
  )
}

export default AdminPricing