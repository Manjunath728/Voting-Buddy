import React from 'react'
import Papa from "papaparse";
import { Button, FormLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import fileDownload from 'js-file-download';
import { useState } from 'react';

function VoterDetails({FormData,setFormData}) {
    
    const handleFormChange=(event,index)=>{
      let data=[...FormData.voter]
      data[index][event.target.name]=event.target.value
      setFormData((prevValue)=>({
        ...prevValue,
        voter:data
      }))
     
    }
    const AddMore=()=>{
      setFormData((prevValue)=>({
        ...prevValue,
        voter:[...prevValue.voter,{voterName:"",acessKey:"",passKey:"",email:""}]
      }))
    }
    const removeFields=(index)=>{
      if(FormData.voter.length===1){
        
        
      }else{
        let data=[...FormData.voter]
        data.splice(index,1)
        setFormData((prevValue)=>({
          ...prevValue,
          voter:data
        }))
      }
      
      
    }
  return (
    <>
    {
      (FormData.securityType==="Public")?
        <h1>Voter List not required for public election </h1> :   
        <>
    <FormLabel ><Typography variant='h5'>Voters</Typography></FormLabel>
  <Container>
      <Grid>
  {
    FormData.voter.map((voter,index)=>{
      return(
        <Paper elevation={5} key={index} style={{padding:"20px" ,margin:"20px auto"}}>
        <TextField 
    label="Voter name"
    variant='outlined'
    placeholder='enter voter name'
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='voterName'
    value={voter.voterName}
  />
  <TextField 
    label="acessKey"
    variant='outlined'
    placeholder='enter Voter acessKey'
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='acessKey'
    value={voter.acessKey}
  />
  <TextField 
    label="passKey"
    variant='outlined'
    placeholder='enter Voter passKey'
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='passKey'
    value={voter.passKey}
  />
  <TextField 
    label="email"
    variant='outlined'
    placeholder='enter Voter email'
    onChange={(event)=>handleFormChange(event,index)}
    margin='normal'
    name='email'
    value={voter.email}
  />
  <Button  onClick={()=>removeFields(index)}><DeleteIcon /></Button>
  </Paper> )
    })
  } 
</Grid></Container><Button onClick={AddMore}><AddIcon/></Button>


    <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          
          if (files) {

            Papa.parse(files[0], {header:true,
              complete: ({data})=> {
                if(data[0].hasOwnProperty("voterName")&&data[0].hasOwnProperty("acessKey")&&data[0].hasOwnProperty("passKey")&&data[0].hasOwnProperty("email")){
                  setFormData((prevValue)=>({
                    ...prevValue,
                    voter:data
                  }))
                }
                else{
                  alert("csv file not matching")
                }
                
              
              }
            }
            )
          }
        }}
      /></>
    }
 </> )
}

export default VoterDetails
