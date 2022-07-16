import { Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
function Logout() {
  return (<>
<ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
   <Box > <h1>Confirm logout</h1>

    <Link to="/logout/confirm"> <Button variant="contained" color='primary' style={{color:"white" }}>Logout</Button></Link></Box></ThemeProvider></>
  )
}

export default Logout