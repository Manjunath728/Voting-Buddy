import { Avatar, Paper, Stack, Typography } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne';
import React from 'react'

function Guide() {
  return (
    <>
    <Paper elevation={4} sx={{margin:"3rem",padding:"20px"}} ><Typography variant='h3' sx={{color:"#EC7700",fontFamily:"Carter One"}} textAlign={"center"}>How  to  use  VottingBuddy</Typography></Paper>
    <Paper elevation={4} sx={{margin:"3rem",padding:"30px"}}>
   <Typography variant='h4' sx={{color:"#8D8D8D",fontFamily:"Carter One"}}> 1.Design your perfect ballot in minutes</Typography>
      <Typography  variant='body1'sx={{color:"#8D8D8D"}}>Add your election name and schedule dates. Choose from a variety of ballot types and add candidate details,  and bios, or approvals with bylaws documents. Personalize notices for email, text message, postcards or letters. Then add your voter list and let the voting begin.</Typography>
    </Paper>
    <Paper elevation={4} sx={{margin:"3rem",padding:"30px"}}>
   <Typography variant='h4' sx={{color:"#8D8D8D",fontFamily:"Carter One"}}> 2.It's easy for voters to vote</Typography>
      <Typography  variant='body1'sx={{color:"#8D8D8D"}}>When voter sign in to voter page ,all e;ligible elction will diplay in dashboard and allow them to vote based on election status</Typography>
    </Paper>
    <Paper elevation={4} sx={{margin:"3rem",padding:"30px"}}>
   <Typography variant='h4' sx={{color:"#8D8D8D",fontFamily:"Carter One"}}>3.Immediate high-integrity results</Typography>
      <Typography  variant='body1'sx={{color:"#8D8D8D"}}>Results are tallied instantly and can be shared automatically with voters, linked to your website or shared after approval, you choose. Integrate voter statistics with your member management system too. All while keeping voter's choices secret and ensuring observability.</Typography>
    </Paper>
    </>
  )
}

export default Guide