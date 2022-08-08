import { Button, createTheme, Step, StepLabel, Stepper, ThemeProvider, unstable_composeClasses } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BallotDesign from './BallotDesign'
import BasicDetails from './BasicDetails'
import Payment from './Payment'
import VoterDetails from './VoterDetails'

function getStep(){
  return [
    "Basic Details",
    "Ballot Design",
    "Voter Details",
    "Payment"

  ]
}


function LinearStepper() {
  const navigate=useNavigate()
  const [FormData,setFormData]=useState({
    electionTitle:"",
    electionStartAt:"",
    electionEndAt:"",
    securityType:"Private",
    adminAcessType:true,
    voterAcessType:true,
    ballotInstruction:"",
    postionName:"",
    votePerVoter:"",
    electionInstruction:"",
    nota:false,
    candidates:[{candidateName:"",candidateManifesto:""},{candidateName:"",candidateManifesto:""}],
    voter:[{uniqueKey:"",email:""}],
    maxVoter:null,
    price:null
    

  })  
  
    
  
   
   
  
  function getStepContent(step){
    switch (step) {
      case 0:
        return(<BasicDetails FormData={FormData} setFormData={setFormData}/>)
        case 1:
          return(<BallotDesign FormData={FormData} setFormData={setFormData}/>)
        case 2:
          return(<VoterDetails FormData={FormData} setFormData={setFormData}/>)
          
        case 3:
          return(<Payment  FormData={FormData} setFormData={setFormData}/>)
          
      
      default:
        break;
    }
  }
  const [activeStep,setActiveStep]=useState(0)
  const steps=getStep()
 

  const handleNext=()=>{
    setActiveStep(activeStep+1)
    if(activeStep===2&&FormData.securityType==="Private"){
    let data = [...FormData.voter]
    setFormData((prevValue) => ({
      ...prevValue,
      maxVoter:data.length,
      price:data.length*10
    }))
    }
    
  }
  const handleBack=()=>{
    setActiveStep(activeStep-1)
  }
  const handleSubmit=async()=>{
    if(FormData.nota){
      setFormData((prevValue)=>({
        ...prevValue,
        candidates:[...prevValue.candidates,{candidateName:"Nota",candidateManifesto:"None of the Above"}]

      }))
      console.log(FormData.candidates);
    }
    if(FormData.securityType==="Private"){
      var FinalData={
        details: {
          electionTitle: FormData.electionTitle,
          electionStartAt:FormData.electionStartAt,
          electionEndAt:FormData.electionEndAt,
          securityType: FormData.securityType,
          adminAcessType: FormData.adminAcessType,
          voterAcessType: FormData.voterAcessType,
        },
        ballots: {
          ballotInstruction:FormData.ballotInstruction,
          postionName:FormData.postionName,
          votePerVoter: FormData.votePerVoter,
          electionInstruction:FormData.electionInstruction ,
          nota: true
        },
        candidates: FormData.candidates,
        voter:FormData.voter,
        payment:{
          maxVoter: FormData.maxVoter,
          price:FormData.price
        }
      }
    }else{
      var FinalData={
        details: {
          electionTitle: FormData.electionTitle,
          electionStartAt:FormData.electionStartAt,
          electionEndAt:FormData.electionEndAt,
          securityType: FormData.securityType,
          adminAcessType: FormData.adminAcessType,
          voterAcessType: FormData.voterAcessType,
        },
        ballots: {
          ballotInstruction:FormData.ballotInstruction,
          postionName:FormData.postionName,
          votePerVoter: FormData.votePerVoter,
          electionInstruction:FormData.electionInstruction ,
          nota: true
        },
        candidates: FormData.candidates,
        payment:{
          maxVoter: FormData.maxVoter,
          price:FormData.price
        }
      }
    }
    
    const config = {
      headers: {
        "content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.authToken
      }
    }
    try {
      const {data}= await  axios.post("http://localhost:5000/api/administrator/electioncreate",FinalData,config)
   if(data.sucess===true){
    toast.success("Sucessfully Created Election", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      navigate("/dashboard ")
  }
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
   
    
  }
  

  
  return (
    <div>
      <ThemeProvider theme={createTheme({palette: { primary: {main:"#EC7700"}}})}>
      <Stepper activeStep={activeStep}>
      {
        steps.map((step,index)=>{
          return (
          <Step key={index}>
          <StepLabel>{step}</StepLabel>
        </Step>
          )
        })
      }
      </Stepper>
      
      <form >
        {
          getStepContent(activeStep)
        }
        <Button variant='contained' onClick={handleBack} disabled={activeStep===0}>Back</Button>
        {
          activeStep===steps.length-1?<Button onClick={handleSubmit}> Pay And Submit </Button>:<Button onClick={handleNext} variant='contained' >Next</Button>
        }
      
      
      </form>
    
      
      </ThemeProvider>
    </div>
  )
}

export default LinearStepper