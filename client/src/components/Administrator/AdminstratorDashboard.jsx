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
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import useFetch from "../Athenticate/usefectch";
import { Container } from "@mui/system";
function AdminstratorDashboard() {
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
                        <Typography variant="h6">Status</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Voting percentage</Typography>
                      </TableCell>
                      <TableCell><Typography variant="h6">Delete</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.election.map((ele, index) => {
                      return (
                        
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Link to={`/election/${ele._id}`}>{ele.details.electionTitle}</Link>
                            </TableCell>
                            <TableCell>Not yet Started</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell><DeleteIcon/></TableCell>

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
