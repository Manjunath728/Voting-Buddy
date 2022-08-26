import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

function Contact() {
  return (
    <Paper elevation={4} sx={{margin:"3rem",padding:"30px"}}>
   <Typography textAlign={"center"} variant='h3' sx={{color:"#00263A",fontFamily:"Carter One"}}>Contact US</Typography>
      <Typography textAlign={"center"}  variant='h5'sx={{color:"#8D8D8D"}}> <br /><br /> Write your Querry and <a href = "mailto: vottingBuddy@gmail.com"><Button sx={{color:"white",backgroundColor:"#EC7700"}} variant='contained'>click here</Button></a> to email us and call us on toll free number 9009090XXX
.</Typography>    
    </Paper>
  )
}

export default Contact