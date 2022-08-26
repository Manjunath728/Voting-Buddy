import { Paper, Typography } from '@mui/material'
import React from 'react'

function About() {
  return (
    <>
    <Paper elevation={4} sx={{margin:"3rem",padding:"30px"}}>
   <Typography textAlign={"center"} variant='h3' sx={{color:"#00263A",fontFamily:"Carter One"}}>About US</Typography>
      <Typography textAlign={"center"}  variant='h5'sx={{color:"#8D8D8D"}}> <br /><br /> VottingBuddy is about accessible democracy around the world. Our team of Election Experts build and deliver easy to use, high integrity, affordable voting solutions to voters and voting administrators of member-based organizations.
<br/><br/>VottingBuddy is the result of frustrations running elections for student groups, associations and not for profit organizations. We spent many hours tallying paper ballots and kludgy spreadsheets or scripts to tally and share results. After searching for solutions we found that they were either too hard or way too expensive. We knew we could do better.<br/><br/>

So we created an online election system with that could be accessed affordably, using desktop computer, laptop, smartphone or tablet.</Typography>    
    </Paper>
    </>
  )
}

export default About