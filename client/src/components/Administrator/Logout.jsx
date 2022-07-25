import { Button, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function Logout() {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.setItem("authToken", "")
    navigate("/")
    toast.success("logged out sucessfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (<>
    <ThemeProvider theme={createTheme({ palette: { primary: { main: "#EC7700" } } })}>
      <Box display="flex"
        justifyContent="center"
        alignItems="center"

        minHeight="100vh" > <Grid textAlign={"center"}><h1 style={{fontFamily:"Inter",color:"grey"}}>Confirm logout</h1>

          <Button variant="contained" onClick={handleClick} color='primary' style={{ color: "white" }}>Logout</Button></Grid></Box></ThemeProvider></>
  )
}

export default Logout