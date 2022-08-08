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
import { Link } from "react-router-dom";
import useFetchAdmin from "../hooks/useFetchAdmin";
import { Container } from "@mui/system";
function AdminstratorDashboard() {
  const url = "http://localhost:5000/api/administrator";

  const { data: user, error } = useFetchAdmin(url);

  if (user === null) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  if (user === undefined) {
    return <h1>Loading.....</h1>;
  }
  const Status=(ele)=>{
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
      return (eleStatus)
  }
  return (
    <>
      {user.election.length === 0 ? (
        <>
          <ThemeProvider
            theme={createTheme({ palette: { primary: { main: "#EC7700" } } })}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Grid textAlign={"center"}>
                <h2 style={{ fontFamily: "Inter", color: "grey" }}>
                  No Election found Create New Election{" "}
                </h2>
                <Link to="/electioncreate">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ color: "white" }}
                  >
                    Create Election
                  </Button>
                </Link>
              </Grid>
            </Box>
          </ThemeProvider>
        </>
      ) : (
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
                        <Typography variant="h6">Election Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Status</Typography>
                      </TableCell>
                      <TableCell><Typography variant="h6">Deatils</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.election.map((ele, index) => {
                      return (

                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {ele.details.electionTitle}
                          </TableCell>
                          <TableCell>{ele.details.securityType}</TableCell>
                          <TableCell>{Status(ele)}</TableCell>
                          <TableCell><Link to={`/election/${ele._id}`}><ThemeProvider
                            theme={createTheme({ palette: { primary: { main: "#EC7700" } } })}
                          ><Button variant="contained" style={{ color: "white" }}>View deatils</Button></ThemeProvider></Link></TableCell>

                        </TableRow>

                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}

export default AdminstratorDashboard;
