import React from 'react'
import { TextField } from '@mui/material'
function Payment({FormData,setFormData}) {
  return (<>
    {
     (FormData.securityType==="Public")?
     <TextField/>:

      (FormData.voter.length<10)?
      <h3> you have below 10 voter its free no nedd to pay </h3>:
      <h1>you have to pay</h1>
    }
 </> )
}

export default Payment