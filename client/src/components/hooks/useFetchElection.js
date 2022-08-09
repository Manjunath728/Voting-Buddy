import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function useFetchElection(electionid, from) {
  
  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + localStorage.authToken,
    },
  };
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [electionStatus, setElectionStatus] = useState(null);
  const [votingStatus, setVotingStatus] = useState(null);
  useEffect(() => {
    if (from === "administrator") {
      axios
        .post(
          "http://localhost:5000/api/administrator/getelection",
          {
            id: electionid,
          },
          config
        )
        .then((response) => {
          setData(response.data.election);
          setElectionStatus(response.data.eletionStatus)
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else if (from === "voter") {
      axios
        .post(
          "http://localhost:5000/api/user/getelection",
          {
            id: electionid,
          },
          config
        )
        .then((response) => {
          setData(response.data.election);
          setElectionStatus(response.data.eletionStatus);
          setVotingStatus(response.data.VotingStatus);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, []);

  return { data, electionStatus, votingStatus, error };
}

export default useFetchElection;
