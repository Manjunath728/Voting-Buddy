import { Button, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system'
import React from 'react'
import { useState } from 'react';

function BallotDesign({FormData,setFormData}) {
  
  
  const handleFormChange=(event,index)=>{
    let data=[...FormData.candidates]
    data[index][event.target.name]=event.target.value
    setFormData((prevValue)=>({
      ...prevValue,
      candidates:data
    }))
   
  }
  const AddMore=()=>{
    setFormData((prevValue)=>({
      ...prevValue,
      candidates:[...prevValue.candidates,{candidateName:"",candidateManifesto:""}]
    }))
  }
  const removeFields=(index)=>{
    if(FormData.candidates.length===1||FormData.candidates.length===2){
      
      
    }else{
      let data=[...FormData.candidates]
      data.splice(index,1)
      setFormData((prevValue)=>({
        ...prevValue,
        candidates:data
      }))
    }
    
    
  }
  return (<>
  <TextField 
    
    label="Ballot Instruction"
    type="text"
    variant='outlined'
    multiline
    minRows={3}
    placeholder='add instruction or information to voter about your ballot '
    fullWidth
    margin='normal'
    name='ballotInstruction'
    value={FormData.ballotInstruction}
    onChange={(event)=>setFormData({...FormData,ballotInstruction:event.target.value})}
  />
    <TextField 
    label="Position Name"
    variant='outlined'
    placeholder='enter Position name'
    fullWidth
    margin='normal'
    name='postionName' 
    value={FormData.postionName}
    onChange={(event)=>setFormData({...FormData,postionName:event.target.value})}
  />
  <FormLabel >Candidates</FormLabel>
  <Container>
      <Grid>
  {
    FormData.candidates.map((form,index)=>{
      return(
        <Paper elevation={5} key={index} style={{padding:"20px" ,margin:"20px auto"}}>
        <TextField 
    label="Candidate name"
    variant='outlined'
    placeholder='enter candidate name'
    fullWidth
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='candidateName'
    value={form.candidateName}
  />
  <TextField 
    label="Manifesto"
    variant='outlined'
    placeholder='enter Candidate manifesto'
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='candidateManifesto'
    value={form.candidateManifesto}
  />
  <Button  onClick={()=>removeFields(index)}><DeleteIcon /></Button>
  </Paper> )
    })
  } 
</Grid></Container>
  <Button onClick={AddMore}><AddIcon/></Button>
  <TextField 
    label="Vote Per Voter"
    type="number"
    variant='outlined'
    placeholder='how much  Vote  can cast by single voter '
    fullWidth
    margin='normal'
    name='VotePerVoter'
    value={FormData.votePerVoter}
    onChange={(event)=>setFormData({...FormData,votePerVoter:event.target.value})}
  />
  <TextField 
    
    label="voting Instruction"
    type="text"
    variant='outlined'
    multiline
    minRows={3}
    placeholder='add instruction or information to voter about your Election '
    fullWidth
    margin='normal'
    name='electionInstruction'
    value={FormData.electionInstruction}
    onChange={(event)=>setFormData({...FormData,electionInstruction:event.target.value})}
    
  />
  <FormLabel >Do you want nota in your Ballot</FormLabel>
  
  <RadioGroup
  row
    defaultValue="No"
    name="nota"
    value={FormData.nota}
    onChange={(event)=>setFormData({...FormData,nota:event.target.value})}
  >
     <FormControlLabel value={true} control={<Radio />} label="Yes" />
    <FormControlLabel value={false} control={<Radio />} label="No" />
   
   
  </RadioGroup>
  
  </>)
}

export default BallotDesign