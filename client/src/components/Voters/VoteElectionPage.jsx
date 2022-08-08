import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useNavigate, useParams } from "react-router-dom";
import useFetchElection from "../hooks/useFetchElection";
import { useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function VoteElectionPage() {
  const navigate = useNavigate();
  const { electionid } = useParams();
  const [remember, setRemember] = useState([]);
  const [results, setResults] = useState({});
  const [resultsLoading, setIsResultsLoading] = useState(true);
  const [graphData, setGraphData] = useState({});
  const [pass, setPass] = useState("");
  const [isresults, setIsResults] = useState(false);
  const {
    data: ele,
    electionStatus,
    votingStatus: isVoted,
    error,
  } = useFetchElection(electionid, "voter");

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
  const handleVote = (e, index) => {
    const { value, checked } = e.target;

    if (checked) {
      setRemember([...remember, value]);
    } else {
      setRemember(remember.filter((e) => e !== value));
    }
  };
  const vote = async () => {
    const voteingRequiredData = {
      eleId: electionid,
      forVoted: remember,
      uniqueKey: pass,
    };

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/postvote",
        voteingRequiredData,
        config
      );
      if (data.sucess === true) {
        toast.success("voted sucess", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/voter/dashboard");
      }
    } catch (error) {
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
  };
  const errorr = remember.filter((v) => v).length !== ele.ballots.votePerVoter;
  const handleResult = async () => {
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
    };
    await axios
      .post(
        "http://localhost:5000/api/user/getresults",
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
          console.log("am Done");
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
  };
  if (remember.length !== ele.ballots.votePerVoter && pass !== "") {
    console.log("true");
  } else {
    console.log("flase");
  }
  return (
    <>
      <Grid>
        <Paper
          elevation={20}
          style={{
            padding: "30px 20px",
            width: 1000,
            margin: "20px auto",
          }}
        >
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
              !isVoted ? (
                <>
                  <Typography variant="h4" align="center">
                    Election is Live Please vote....{" "}
                  </Typography>
                  <Typography variant="h5">
                    <b>Voting Instruction :</b>

                    {ele.ballots.electionInstruction}
                  </Typography>

                  <Box component="form">
                    <Paper
                      component={Box}
                      width="auto"
                      p={4}
                      mx="auto"
                      elevation={4}
                    >
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                      >
                        {ele.details.securityType === "Private" && (
                          <TextField
                            label="Unique Key"
                            placeholder="Enter unique key "
                            value={pass}
                            onChange={(e) => {
                              setPass(e.target.value);
                            }}
                            variant="outlined"
                          />
                        )}

                        {ele.candidates.map((can, index) => {
                          return (
                            <Item>
                              <Avatar variant="square"  sx={{ width: 100, height: 100 }}><AccountCircleIcon/></Avatar>
                              <Typography variant="h3">
                                {can.candidateName}
                              </Typography>
                              <Typography variant="h5">
                                <b>Manifesto:</b>
                                {can.candidateManifesto}
                              </Typography>
                              <FormControlLabel
                                key={index}
                                label={
                                  <Typography variant="h5">Select</Typography>
                                }
                                control={
                                  <Checkbox
                                    value={can.candidateName}
                                    onChange={(e) => handleVote(e, index)}
                                  />
                                }
                              ></FormControlLabel>
                            </Item>
                          );
                        })}
                        <Button
                          style={{ margin: "10px" }}
                          onClick={vote}
                          variant="contained"
                          disabled={
                            remember.length !== ele.ballots.votePerVoter
                          }
                        >
                          Vote Now
                        </Button>
                      </Stack>
                    </Paper>{" "}
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h4" align="center">
                    Election is Live{" "}
                  </Typography>
                  <Typography>
                    {" "}
                    But You alredy voted and wait for results{" "}
                  </Typography>
                </>
              )
            ) : electionStatus === "Completed" && ele.details.voterAcessType ? (
              !isresults ? (
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
              )
            ) : (
              <>
                <Typography textAlign={"center"}>
                  For this election Voter Dont have acess to result
                </Typography>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default VoteElectionPage;
