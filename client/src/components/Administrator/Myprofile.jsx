
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetchAdmin from '../hooks/useFetchAdmin'

function Myprofile() {
  const url="http://localhost:5000/api/administrator"

  const {data:user,error}=useFetchAdmin(url)
  
  if(user===null){return(<h1>Loading</h1>)}
  if(error){console.log(error)}

  if(user===undefined){
    return (<h1>Loading.....</h1>)
  }

  return (
    <><h1>Myprofile</h1>
      <p>your name is {user.name} </p>
      <p>your email is{user.email} </p>
      <p>your organization is {user.organizationName}</p>
      {user.election.map((ele,index)=>{return(<h2 key={index}>{ele.details.electionTitle}</h2>)})}

    </>

  )
}

export default Myprofile