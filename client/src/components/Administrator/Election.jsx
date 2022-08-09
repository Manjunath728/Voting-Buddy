import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import useFetchElection from "../hooks/useFetchElection";
import { toast } from "react-toastify";
const PaperStyle = {
  padding: "30px 20px",
  width: 1000,
  margin: "20px auto",
};
function Election() {
  const { electionid } = useParams();
  const [isresults, setIsResults] = useState(false);
  const [results, setResults] = useState({});
  const [resultsLoading, setIsResultsLoading] = useState(true);
  const [graphData, setGraphData] = useState({});

  const {
    data: ele,
    electionStatus,
    error,
  } = useFetchElection(electionid, "administrator");

  if (ele === null) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  if (ele === undefined) {
    return <h1>Loading.....</h1>;
  }
  const local = (time) => {
    var date = new Date(time);
    return date.toLocaleString();
  };
  const handleResult = async () => {
    
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + localStorage.authToken,
        },
      };
      await axios
        .post(
          "http://localhost:5000/api/administrator/getresults",
          { electionId: electionid },
          config
        )
        .then((response) => {
          if (response.data.sucess) {
            setResults(response.data.results);
            setGraphData({
              labels: results.votesArray.map((data) => data.candidateName),
              datasets: [
                {
                  label: "vote count",
                  data: results.votesArray.map((data) => data.votes),
                  backgroundColor: ["#FEBF00", "#F89963", "#F9A602"],
                  borderWidth: "2px",
                  borderColor: ["blue"],
                },
              ],
            });
            setIsResults(true);
            setIsResultsLoading(true);
          } else {
            toast.error(error.response.data.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    

    }
  
  return (
    <>
      <Grid>
        <Paper elevation={20} style={PaperStyle}>
          <Grid>
            <Typography variant="h2" align="center">
              {ele.details.electionTitle}
            </Typography>
            <Typography
              variant="button"
              display="block"
              align="center"
              gutterBottom
            >
              <span
                style={{
                  backgroundColor: "#EC7700",
                  padding: "3px 10px",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                {electionStatus}
              </span>
            </Typography>

            <Typography variant="h6" align="center">
              <span style={{ color: "#EC7700" }}>
                {local(ele.details.electionStartAt)}
              </span>{" "}
              -{" "}
              <span style={{ color: "#EC7700" }}>
                {local(ele.details.electionEndAt)}
              </span>
            </Typography>

            <br />
            <Typography variant="h5">
              <b>Election Instruction :</b>

              {ele.ballots.ballotInstruction}
            </Typography>
            <br />
            <Typography variant="h5">
              <b>Position :</b>
              {ele.ballots.postionName}
            </Typography>
            <br />
            {electionStatus === "notStarted" ? (
              <>election will start at {ele.details.electionStartAt} </>
            ) : electionStatus === "Live" ? (
              ele.details.adminAcessType ? (
                !isresults ? (
                  <>
                    {" "}
                    Election is Live
                    <Button variant="contained" onClick={handleResult}>
                      Click Results
                    </Button>
                  </>
                ) : resultsLoading ? (
                  <>
                    <Paper
                      elevation={3}
                      style={{ height: "auto", width: "auto", padding: "10px" }}
                    >
                      <Typography>Live Results </Typography>
                      <Typography variant="h5" textAlign={"center"}>
                        {" "}
                        the Leading to Winner is ......
                      </Typography>
                      <Typography
                        variant="h2"
                        className="winnerText"
                        style={{
                          fontFamily: "Carter One",
                          letterSpacing: ".2rem",
                        }}
                        textAlign={"center"}
                      >
                        {results.winner.candidateName}
                      </Typography>{" "}
                      <Grid style={{ margin: "15px" }}>
                        <Bar data={graphData} />
                      </Grid>
                    </Paper>
                  </>
                ) : (
                  <>Loading.....</>
                )
              ) : (
                <> Election is Live but you dont have acess to see Live results</>
              )
            ) : electionStatus === "Completed" && !isresults ? (
              <>
                Election completed
                <Button variant="contained" onClick={handleResult}>
                  Click Results
                </Button>
              </>
            ) : resultsLoading ? (
              <>
                <Paper
                  elevation={3}
                  style={{ height: "auto", width: "auto", padding: "10px" }}
                >
                  <Typography variant="h5" textAlign={"center"}>
                    {" "}
                    the Winner is ......
                  </Typography>
                  <Typography
                    variant="h2"
                    className="winnerText"
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      letterSpacing: ".8rem",
                    }}
                    textAlign={"center"}
                  >
                    {results.winner.candidateName}
                  </Typography>{" "}
                  <Grid style={{ margin: "15px" }}>
                    <Bar data={graphData} />
                  </Grid>
                </Paper>
              </>
            ) : (
              <>Loading.....</>
            )}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Election;
