import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

 function  useFecthAdminData  () {
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }
  const [administartorData, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect( () => {
     axios.get("http://localhost:5000/api/admin/getadministrator",config).then((response) => {setData(response.data.administartorData)}).catch((err)=>{console.log(err)})
  },[]);
 
  return {administartorData,error};
}

export default useFecthAdminData;
