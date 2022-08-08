import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

 function  useFetchVoter  (url) {
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect( () => {
     axios.get("http://localhost:5000/api/user",config).then((response) => {setData(response.data.user)}).catch((err)=>{console.log(err)})
  },[]);
 
  return {data,error};
}

export default useFetchVoter;
