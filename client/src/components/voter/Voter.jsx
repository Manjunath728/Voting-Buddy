import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Voter() {
  return (<>
    <h1>check your email box to vote</h1>
    <h3>if you have election secrete acess key then <Link to="/vote"><Button variant='contained'>click here</Button></Link> </h3>
    </>
  )
}

export default Voter