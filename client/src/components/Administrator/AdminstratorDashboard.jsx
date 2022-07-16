import React from 'react'
import { Box, Button, Grid, ThemeProvider,createTheme } from "@mui/material";

function AdminstratorDashboard() {
  return (<>
  <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
  <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
 
  minHeight="100vh">
  <Grid textAlign={"center"}><h2 style={{fontFamily:"Inter",color:"grey"}}>No Election found Create  New Election </h2>
  <Button variant='contained' color='primary' sx={{color:"white"}}>Create Election</Button></Grid></Box></ThemeProvider>
    

  </>)
}

export default AdminstratorDashboard