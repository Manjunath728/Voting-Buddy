import React from 'react'
import BallotIcon from '@mui/icons-material/Ballot';
import {Link} from "react-router-dom"
function BlankHeader() {
  return (
    <div><>
    
    <header className="header sticky">
   
    <h1 className="logo"><Link to="/" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
 
</header> 
<header className="header ">
   
    <h1 className="logo"><Link to="/" style={{cursor: "pointer"}}><BallotIcon fontSize="large"
    sx={{
      color:"#EC7700",
      fontSize: "26px"
    }} />  VotingBuddy</Link></h1>
 
</header>

 
</></div>
  )
}

export default BlankHeader