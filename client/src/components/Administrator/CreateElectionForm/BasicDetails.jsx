import React from 'react'
import {  FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'

function BasicDetails({FormData,setFormData}) {
  return (<>
    <TextField 
    id="Election"
    label="Election Title"
    variant='outlined'
    placeholder='Enter Eletion Title'
    fullWidth
    margin='normal'
    name='electionTitle'
    value={FormData.electionTitle}
    onChange={(event)=>setFormData({...FormData,electionTitle:event.target.value})}
  />
  <TextField
        label="Election Start At"
        type="datetime-local"
        margin='normal'
        sx={{ width: "100%" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={FormData.electionStartAt}
        onChange={(event)=>setFormData({...FormData,electionStartAt:event.target.value})}
        />
  <TextField
        id="End At"
        label="Election End At"
        type="datetime-local"
        margin='normal'
        sx={{ width: "100%" }}
        InputLabelProps={{
          shrink: true,
        }}
        value={FormData.electionEndAt}
        onChange={(event)=>setFormData({...FormData,electionEndAt:event.target.value})}
        />
  
  <FormLabel>Security type</FormLabel>
  <Typography variant='caption'>(  private if your election voteList are decided by you  )</Typography>
  <RadioGroup
  row
    aria-labelledby="demo-radio-buttons-group-label"
    
    name="security type"
    value={FormData.securityType}
    onChange={(event)=>setFormData({...FormData,securityType:event.target.value})}
    
  >
     <FormControlLabel value="Private" control={<Radio />} label="Private" />
    <FormControlLabel value="Public" control={<Radio />} label="Public" />
   
   
  </RadioGroup>
  <FormLabel>Should administrator acess Live  result </FormLabel>
  <RadioGroup
  row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Yes"
    name="security type"
    value={FormData.adminAcessType}
    onChange={(event)=>setFormData({...FormData,adminAcessType:event.target.value})}
  >
     <FormControlLabel value={true} control={<Radio />} label="Yes" />
    <FormControlLabel value={false} control={<Radio />} label="No" />
   
   
  </RadioGroup>
  <FormLabel >Should Voter acess result </FormLabel>
  
  <RadioGroup
  row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Yes"
    name="security type"
    value={FormData.voterAcessType}
    onChange={(event)=>setFormData({...FormData,voterAcessType:event.target.value})}
  >
     <FormControlLabel value={true} control={<Radio />} label="Yes" />
    <FormControlLabel value={false} control={<Radio />} label="No" />
   
   
  </RadioGroup>

  </>
  )
}


export default BasicDetails