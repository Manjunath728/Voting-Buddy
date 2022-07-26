import { Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../Athenticate/usefectch';
const PaperStyle={
  padding:"30px 20px",width:1000,margin:"20px auto"
}
function Election() {
    const {electionid}=useParams()
    console.log(electionid);
    const url = "http://localhost:5000/api/administrator";

  const { data: user, error } = useFetch(url);
    
  if (user === null) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  if (user === undefined) {
    return <h1>Loading.....</h1>;
  }
  const ele=user.election.filter(x=>x._id===electionid)[0]
  console.log(ele)
  const StartTime=new Date(ele.details.electionStartAt)
  const PresentTime=new Date()
  const EndTime=new Date(ele.details.electionEndAt)
  let status
  if(StartTime>PresentTime){ 
    console.log("Election not yet started ")
  }else if(StartTime<PresentTime&&EndTime>PresentTime){
    console.log("Election is active")
  }else {  
    console.log("Election is completed")
  }
  console.log(ele.details.electionStartAt);
  return (<>
    <Grid>
      
        <Paper elevation={20} style={PaperStyle}>
          <Grid>
            <Typography variant='h3' align='center'>{ele.details.electionTitle}</Typography>
          </Grid>
        </Paper>
      
    </Grid>
    </>
  )
}

export default Election