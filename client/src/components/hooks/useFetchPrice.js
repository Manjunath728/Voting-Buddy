import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

 function  useFetchPrice  () {
  const config = {
    headers: {
      "content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.authToken
    }
  }
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  useEffect( () => {
     axios.get("http://localhost:5000/api/administrator/getprice",config).then((response) => {setPrice(response.data.price.pricePerVoter)}).catch((err)=>{console.log(err)})
  },[]);
  return {price,error};
}

export default useFetchPrice;
