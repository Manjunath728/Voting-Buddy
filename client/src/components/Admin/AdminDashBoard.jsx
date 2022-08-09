import React from "react";
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
  Paper,
  createTheme,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import useFecthAdminData from "../hooks/useFecthAdminData";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

function AdminDashBoard() {
  const { administartorData: administartor, error } = useFecthAdminData();

  if (administartor === null) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  if (administartor === undefined) {
    return <h1>Loading.....</h1>;
  }
  const TotalPrice=()=>{
    var tempPrice=0
    administartor.map(admins=>{
      if(!(admins.election.length===0))
      admins.election.map(ele=>{
        tempPrice=tempPrice+ele.payment.price
      })
    })
    return tempPrice
  }
  
  const Status = (ele) => {
    const StartTime = new Date(ele.details.electionStartAt);
    const PresentTime = new Date();
    const EndTime = new Date(ele.details.electionEndAt);
    var eleStatus;
    var voted;
    if (StartTime > PresentTime) {
      eleStatus = "Not Started";
    } else if (StartTime < PresentTime && EndTime > PresentTime) {
      for (var i = 0; i < ele.voter.length; i++) {
        if (ele.voter[i].isVoted === true) {
          voted = true;
        } else {
          voted = false;
          break;
        }
      }
      if (voted) {
        eleStatus = "Completed";
      } else {
        eleStatus = "Live";
      }
    } else {
      eleStatus = "Completed";
    }
    return eleStatus;
  };
  return (
    <>
      <Container>
        <Paper elevation={4} sx={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Election</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Position Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Hosted By</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Organization</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Election Type</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Price</Typography>
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {administartor.map((admins, index) => {
                  return <> {!(admins.election.length===0) && <>
                  {admins.election.map((ele, index) => {
                      return (

                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {ele.details.electionTitle}
                          </TableCell>
                          <TableCell>
                            {ele.ballots.postionName}
                          </TableCell>
                          <TableCell>
                            {admins.name}
                          </TableCell>
                          <TableCell>
                            {admins.organizationName}
                          </TableCell>
                          <TableCell>{ele.details.securityType}</TableCell>
                          <TableCell>{Status(ele)}</TableCell>
                          <TableCell>{ele.payment.price}</TableCell>
                          
                        </TableRow>

                      );
                    })}
                  </>}</>
                })}
                <TableRow>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Total Earned</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{TotalPrice()}</Typography>
                  </TableCell>
                  
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}

export default AdminDashBoard;
