import { Avatar, Grid, Paper, Typography ,Box} from '@mui/material'
import Voter from "../images/voter.png"
import Admin from "../images/admin.png"
import ReturnAdmin from "../images/returnAdmin.png"
import React from 'react'
import { Link } from 'react-router-dom'
const PaperStyle={
    padding:"50px 20px" ,margin:"20px"
}
const headerStyle={
  fontFamily:"Carter One  "
}
function Cards() {
  return (
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
<Grid container
    direction="row"
    justifyContent="center"
    alignItems="center" >
        <Grid   item align="center" xs={12} md={4}>
          <Link to="/voter/signup"><Paper  style={PaperStyle} elevation={20}>
            <img style={{width:"100px"}} src={Voter} />
          <h1 style={headerStyle} > I'm a Voter</h1>
          <Typography >cast my vote now</Typography>
        </Paper> </Link> 
        </Grid>
        <Grid item align="center" xs={12} md={4}>
        <Link to="/signup"><Paper style={PaperStyle}elevation={20}>
          <img style={{width:"100px"}} src={Admin} />
            <h1 style={headerStyle}>I'm a Elector/Administrator</h1>
            <Typography >Start a new election/Manage created election</Typography>
        </Paper></Link>
        </Grid>
        <Grid item align="center" xs={12} md={4}>
        <Link to="/admin/login"><Paper style={PaperStyle} elevation={20}>
          <img style={{width:"100px"}} src={ReturnAdmin} />
            <h1 style={headerStyle}>I'm a Admin</h1>
            <Typography >Manage VotingBuddy</Typography>
            
        </Paper></Link>
        </Grid>
    </Grid>
</Box>
    
  )
}

export default Cards