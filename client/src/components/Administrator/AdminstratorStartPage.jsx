import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import AdministratorHeader from './AdministratorHeader'
import { useState } from 'react'
import axios from 'axios'
function AdminstratorStartPage() {
  const navigate=useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }

useEffect(()=>{
 if(localStorage.authToken){
    axios.get("http://localhost:5000/api/administrator",config).then((isvalid)=>{
      setIsValid(isvalid.data.sucess)
      const {name}=isvalid.data.admin
      setUser(name)
      setIsLoading(false)
    }).catch((error)=>{navigate("/login")})
  }else{
    navigate("/login")
  } 
})

  

  function Page() {
    return <><AdministratorHeader username={user} /><Outlet /></>
  }

  return (
    <>
      {isLoading ? <div>loading.....</div> : isValid === true ? <Page/> : <Navigate to="/login" replace={true} />}
    </>
  )
}

export default AdminstratorStartPage