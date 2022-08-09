import React from 'react'
import BallotIcon from '@mui/icons-material/Ballot';
import {Link} from "react-router-dom"
import HeaderLinks from '../header/HeaderLinks';
function AdminHeader() {
  return (
    <div><>
    
    <header className="header sticky">
   
    <h1 className="logo"><Link to="/admin/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
    <ul className="main-nav">
  
  
  <div ><HeaderLinks route="/admin/pricing" name="Pricing" /></div>
  <div ><HeaderLinks route="/admin/logout" name="Logout" /></div>
  
  
</ul>
 
</header> 
<header className="header ">
   
    <h1 className="logo"><Link to="/admin/dashboard" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
 
</header>

 
</></div>
  )
}

export default AdminHeader