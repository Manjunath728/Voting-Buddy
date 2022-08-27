import {
  Button,
  FormControlLabel,
  FormLabel,
  Stack,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";

function BallotDesign({ FormData, setFormData, formErrors }) {
  const handleFormChange = (event, index) => {
    let data = [...FormData.candidates];
    data[index][event.target.name] = event.target.value;
    setFormData((prevValue) => ({
      ...prevValue,
      candidates: data,
    }));
  };
  const AddMore = () => {
    setFormData((prevValue) => ({
      ...prevValue,
      candidates: [
        ...prevValue.candidates,
        { candidateName: "", candidateManifesto: "" },
      ],
    }));
  };
  const removeFields = (index) => {
    if (FormData.candidates.length === 1 || FormData.candidates.length === 2) {
    } else {
      let data = [...FormData.candidates];
      data.splice(index, 1);
      setFormData((prevValue) => ({
        ...prevValue,
        candidates: data,
      }));
    }
  };
  function filterDigits(evt) {
    var event = evt || window.event;
    var val = event.target.value;
    var filtered = val.replace(/[^A-Za-z ]/g, "");

    if (filtered !== val) {
      event.target.value = filtered;
    }
  }

  return (
    <>
      <TextField
        label="Ballot Instruction"
        type="text"
        variant="outlined"
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.ballotInstruction}
          </Typography>
        }
        multiline
        minRows={3}
        placeholder="add instruction or information to voter about your ballot "
        fullWidth
        margin="normal"
        name="ballotInstruction"
        value={FormData.ballotInstruction}
        onChange={(event) =>
          setFormData({ ...FormData, ballotInstruction: event.target.value })
        }
      />
      <TextField
        label="Position Name"
        variant="outlined"
        placeholder="enter Position name"
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.postionName}
          </Typography>
        }
        fullWidth
        margin="normal"
        name="postionName"
        value={FormData.postionName}
        onChange={(event) =>
          setFormData({ ...FormData, postionName: event.target.value })
        }
      />
      <FormLabel>Candidates</FormLabel>
      <Container>
        <Grid>
          {FormData.candidates.map((form, index) => {
            return (
              <Paper
                elevation={5}
                key={index}
                style={{ padding: "20px", margin: "20px auto" }}
              >
                <Stack
  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
>
                <TextField
                  label="Candidate name"
                  helperText={
                    <Typography style={{ color: "#EC7700" }}>
                      {formErrors.candidates &&
                        formErrors.candidates.map((can) => (
                          <>{can.id === index && can.candidateName}</>
                        ))}
                    </Typography>
                  }
                  variant="outlined"
                  placeholder="enter candidate name"
                  onInput={filterDigits}
                  fullWidth
                  onChange={(event) => handleFormChange(event, index)}
                  margin="normal"
                  name="candidateName"
                  value={form.candidateName}
                />
                <TextField
                  label="Manifesto"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={3}
                  helperText={
                    <Typography style={{ color: "#EC7700" }}>
                      {formErrors.candidates &&
                        formErrors.candidates.map((can) => (
                          <>{can.id === index && can.candidateManifesto}</>
                        ))}
                    </Typography>
                  }
                  placeholder="enter Candidate manifesto"
                  onChange={(event) => handleFormChange(event, index)}
                  margin="normal"
                  name="candidateManifesto"
                  value={form.candidateManifesto}
                />
                <Button  variant={"contained"} onClick={() => removeFields(index)}>
                  <DeleteIcon sx={{color:"white"}} /> 
                </Button></Stack>
              </Paper>
            );
          })}
        </Grid>
      </Container>
      <Button variant={"contained"} onClick={AddMore}>
        <AddIcon  sx={{color:"white"}}/> <Typography sx={{color:"white"}}> Add more candidates</Typography>
      </Button>
      {
        <Typography style={{ color: "#EC7700" }}>
          {formErrors.duplicateCandidatesMessage}
        </Typography>
      }

      <TextField
        label="Vote Per Voter"
        type="number"
        variant="outlined"
        placeholder="how much  Vote  can cast by single voter "
        fullWidth
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.votePerVoter}
          </Typography>
        }
        margin="normal"
        onWheel={(e) => e.target.blur()}
        name="VotePerVoter"
        value={FormData.votePerVoter}
        onChange={(event) =>
          setFormData({ ...FormData, votePerVoter: event.target.value })
        }
      />
      <TextField
        label="voting Instruction"
        type="text"
        variant="outlined"
        multiline
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.electionInstruction}
          </Typography>
        }
        minRows={3}
        placeholder="add instruction or information to voter about your Election "
        fullWidth
        margin="normal"
        name="electionInstruction"
        value={FormData.electionInstruction}
        onChange={(event) =>
          setFormData({ ...FormData, electionInstruction: event.target.value })
        }
      />
      <FormLabel>Do you want nota in your Ballot</FormLabel>

      <RadioGroup
        row
        defaultValue="No"
        name="nota"
        value={FormData.nota}
        onChange={(event) =>
          setFormData({ ...FormData, nota: event.target.value })
        }
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </>
  );
}

export default BallotDesign;
