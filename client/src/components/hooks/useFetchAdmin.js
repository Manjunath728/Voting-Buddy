import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

 function  useFetchAdmin  (url) {
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect( () => {
     axios.get(url,config).then((response) => {setData(response.data.admin)}).catch((err)=>{console.log(err)})
  },[]);
 
  return {data,error};
}

export default useFetchAdmin;
