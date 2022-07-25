import React from 'react'
import BallotIcon from '@mui/icons-material/Ballot';
import {Link, NavLink} from "react-router-dom"
import HeaderLinks from '../header/HeaderLinks';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {ThemeProvider,createTheme } from "@mui/material"
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';


const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: "#EC7700",
      contrastText:"white"
    },
  },
});


function AdministratorHeader(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div><>
    
    <header className="header sticky">
   
    <h1 className="logo"><Link to="/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
    <ul className="main-nav">
  
  <div ><HeaderLinks route="/dashboard" name="Dashboard" /></div>
  <ThemeProvider theme={theme}>
  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="primary"
       
      >
        Hi {props.username} <ArrowDropDownIcon/>
      </Button></ThemeProvider>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <NavLink to="/profile"  className="a" ><MenuItem  onClick={handleClose}>My Profile</MenuItem></NavLink>
      <NavLink to="/organization"  className="a" ><MenuItem onClick={handleClose}>organization</MenuItem></NavLink>
      <NavLink to="/billing"  className="a" ><MenuItem onClick={handleClose}>Billing</MenuItem></NavLink>
      <NavLink to="/logout"  className="a" ><MenuItem onClick={handleClose}>Log Out</MenuItem></NavLink>
      </Menu>


      <ThemeProvider theme={theme}>
        <Box>
          <Link to="/electioncreate">
  <Button
        color="secondary"
        variant='contained'
        sx={{
            height:"40px"
        }}  
       
      >
        Create Election
      </Button></Link></Box></ThemeProvider>


  
  
  
</ul>
 
</header> 
<header className="header ">
   
    <h1 className="logo"><Link to="/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
    <ul className="main-nav">
  
  <div ><HeaderLinks route="/dashboard" name="Dashboard" /></div>
  <ThemeProvider theme={theme}>
  <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="primary"
       
      >
        Hi User1 <ArrowDropDownIcon/>
      </Button></ThemeProvider>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <NavLink to="/profile"  className="a" ><MenuItem  onClick={handleClose}>My Profile</MenuItem></NavLink>
      <NavLink to="/organization"  className="a" ><MenuItem onClick={handleClose}>organization</MenuItem></NavLink>
      <NavLink to="/billing"  className="a" ><MenuItem onClick={handleClose}>Billing</MenuItem></NavLink>
      <NavLink to="/logout"  className="a" ><MenuItem onClick={handleClose}>Log Out</MenuItem></NavLink>
      </Menu>


      <ThemeProvider theme={theme}>
        <Box>
  <Button
        color="secondary"
        variant='contained'
        sx={{
            height:"40px"
        }}  
       
      >
        Create Election
      </Button></Box></ThemeProvider>


  
  
  
</ul>
 
</header>


 
</></div>
  )
}

export default AdministratorHeader