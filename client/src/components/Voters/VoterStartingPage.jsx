import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import VoterHeader from './VoterHeader'
function VoterStartingPage() {
    const navigate=useNavigate()
    const [isValid, setIsValid] = useState(false)
    const [voter, setVoter] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const config = {
      headers: {
        "content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.authToken
      }
    }
  
  useEffect(()=>{
   if(localStorage.authToken){
      axios.get("http://localhost:5000/api/user",config).then((valid)=>{
        setIsValid(valid.data.sucess)
        const {name}=valid.data.user
        setVoter(name)
        setIsLoading(false)
      }).catch((error)=>{navigate("/voter/login")})
    }else{
      navigate("/voter/login")
    } 
  },[])
  
    
  
    function Page() {
      return <><VoterHeader username={voter} /><Outlet /></>
    }
  
    return (
      <>
        {isLoading ? <div>loading.....</div> : isValid === true ? <Page/> : <Navigate to="/voter/login" replace={true} />}
      </>
    )
}

export default VoterStartingPage
