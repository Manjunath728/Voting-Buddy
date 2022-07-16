import React from 'react'
import HeaderLinks from './HeaderLinks'
import BallotIcon from '@mui/icons-material/Ballot';
import {Link} from "react-router-dom"

function Header(props) {
  
  
  return (<>
    
    <header className="header sticky">
   
    <h1 className="logo"><Link to="/" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
  <ul className="main-nav">
  
      <div ><HeaderLinks route="/guide" name="Guide" /></div>
      <div ><HeaderLinks route="/pricing" name="Pricing" /></div>
      <div ><HeaderLinks route="/about" name="about" /></div>
      <div ><HeaderLinks route="/contact" name="contact" /></div>
      
      
  </ul>
</header> 
<header className="header ">
   
    <h1 className="logo"><Link to="/" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  ElectionBuddy</Link></h1>
  <ul className="main-nav">
  
      <div ><HeaderLinks route="/guide" name="Guide" /></div>
      <div ><HeaderLinks route="/pricing" name="Pricing" /></div>
      <div ><HeaderLinks route="/about" name="about" /></div>
      <div ><HeaderLinks route="/contact" name="contact" /></div>
      
      
  </ul>
</header>
 
</>
  )
}

export default Header