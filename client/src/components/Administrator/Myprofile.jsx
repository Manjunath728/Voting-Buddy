
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import useFetch from '../Athenticate/usefectch'

function Myprofile() {
  const url="http://localhost:5000/api/administrator"

  const {data:user,error}=useFetch(url)
  
  if(user===null){return(<h1>Loading</h1>)}
  if(error){console.log(error)}

  if(user===undefined){
    return (<h1>Loading.....</h1>)
  }
 user.election.map((ele)=>{console.log(ele.details.electionTitle)})

  return (
    <><h1>Myprofile</h1>
      <p>your name is {user.name} </p>
      <p>your email is{user.email} </p>
      <p>your organization is {user.organizationName}</p>
      {user.election.map((ele)=>{return(<h2>{ele.details.electionTitle}</h2>)})}

    </>

  )
}

export default Myprofile