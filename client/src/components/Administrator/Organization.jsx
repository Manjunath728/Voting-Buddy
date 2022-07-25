import useFetch from '../Athenticate/usefectch'

function Organization() {
  const url="http://localhost:5000/api/administrator"

  const {data,error}=useFetch(url)
  
  if(data===null){return(<h1>Loading</h1>)}
  if(error){console.log(error)}
  return (<>
    <h1>Organization</h1>
    <p>your organization name is  {data.organizationName} </p>
</>
  )}


export default Organization