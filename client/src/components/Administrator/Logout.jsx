import { Button, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
function Logout() {
  const navigate=useNavigate()
  function handleClick(){
    localStorage.setItem("authToken","")
    navigate("/")
  }
  return (<>
<ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
   <Box   display="flex"
  justifyContent="center"
  alignItems="center"
 
  minHeight="100vh" > <Grid textAlign={"center"}><h1>Confirm logout</h1>

   <Button variant="contained"  onClick={handleClick} color='primary' style={{color:"white" }}>Logout</Button></Grid></Box></ThemeProvider></>
  )
}

export default Logout