import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import AdminHeader from './AdminHeader'
import { toast } from 'react-toastify'
function AdminStartPage() {
  const navigate=useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }

useEffect(()=>{
 if(localStorage.authToken){
    axios.get("http://localhost:5000/api/admin",config).then((isvalid)=>{
      setIsValid(isvalid.data.sucess)
      setIsLoading(false)
    }).catch((error)=>{navigate("/admin/login")})
  }else{
    toast.success("First Login", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    navigate("/admin/login")
  } 
},[])

  

  function Page() {
    return <><AdminHeader /><Outlet /></>
  }

  return (
    <>
      {isLoading ? <div>loading.....</div> : isValid === true ? <Page/> : <Navigate to="/admin/login" replace={true} />}
    </>
  )
}

export default AdminStartPage