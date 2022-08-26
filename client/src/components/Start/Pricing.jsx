import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import useFetchPrice from '../hooks/useFetchPrice';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
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
function Pricing() {
  const { price: presentPrice, error } = useFetchPrice();
  return (
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
                </Avatar><h2 style={headerStyle}>{presentPrice}/- Rs </h2>
               <h2 style={headerStyle}> present  Price per voter</h2>
                <Typography variant='h5'>
               This is vote per price to used to caclulate amount during election
                </Typography>
            </Grid></Paper></Grid></Box>
  )
}

export default Pricing