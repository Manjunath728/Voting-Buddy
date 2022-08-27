import React from 'react'
import { TextField } from '@mui/material'
function Payment( { prevPaid,FormData,setFormData}) {
  let needToPay=FormData.price-(prevPaid)

  if(needToPay<0){
   needToPay=0 
  }
  return (<>
    {
    
      <h1>you have to pay {needToPay }/- Rs to continue</h1>
      
    }
 </> )
}

export default Payment