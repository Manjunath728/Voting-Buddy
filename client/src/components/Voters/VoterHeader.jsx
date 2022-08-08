import React from 'react'
import BallotIcon from '@mui/icons-material/Ballot';
import {Link, useNavigate} from "react-router-dom"
import { Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import { toast } from 'react-toastify';
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Inter', 'sans-serif'],
      textTransform: 'none',
      fontSize: 16,
    }
  },
  palette: { primary: { main: "#EC7700" } }
});
function VoterHeader(props) {
  
  const navigate=useNavigate()
  const handleClick=()=>{
    localStorage.setItem("authToken","")
    navigate("/")
    toast.success("logged out sucessfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  return (
    <div><>
    
    <header className="header sticky"><ThemeProvider theme={theme}>
   
    <h1 className="logo"><Link to="/voter/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
 <div style={{marginRight:"10px"}}>
 <Typography variant='h5'>HI {props.username}</Typography>
      </div><Button style={{color:"white"}} onClick={handleClick}variant='contained'>LogOut</Button>
 
</ThemeProvider></header> 
<header className="header ">
   
    <h1 className="logo"><Link to="/voter/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
 
</header>

 
</></div>)
}

export default VoterHeader