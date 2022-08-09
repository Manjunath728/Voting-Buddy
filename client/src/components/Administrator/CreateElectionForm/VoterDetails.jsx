import React from "react";
import Papa from "papaparse";
import {
  Button,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Container } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";

import VoterList from "./voterlistSample.csv";

import { toast } from "react-toastify";

function VoterDetails({ FormData, setFormData, formErrors,price }) {
  const handleFormChange = (event, index) => {
    let data = [...FormData.voter];
    data[index][event.target.name] = event.target.value;
    setFormData((prevValue) => ({
      ...prevValue,
      voter: data,
    }));
  };
  const AddMore = () => {
    setFormData((prevValue) => ({
      ...prevValue,
      voter: [...prevValue.voter, { uniqueKey: "", email: "" }],
    }));
  };
  const removeFields = (index) => {
    if (FormData.voter.length === 1) {
    } else {
      let data = [...FormData.voter];
      data.splice(index, 1);
      setFormData((prevValue) => ({
        ...prevValue,
        voter: data,
      }));
    }
  };
  
 
  return (
    <>
      {FormData.securityType === "Public" ? (
        <>
          <h1>Voter List not required for public election </h1>
          <TextField
            label="Maximum voter"
            variant="outlined"
            fullWidth
            onWheel={(e) => e.target.blur()}
            helperText={
              <Typography style={{ color: "#EC7700" }}>
                {formErrors.maxVoter}
              </Typography>
            }
            type={"number"}
            placeholder="enter maximum number of voter"
            onChange={(event) =>
              setFormData({
                ...FormData,
                maxVoter: event.target.value,
                price: event.target.value * price,
              })
            }
            margin="normal"
            name="maxVoter"
            value={FormData.maxVoter}
          />
        </>
      ) : (
        <>
          <FormLabel>
            <Typography variant="h5">Voters</Typography>
          </FormLabel>
          <Container>
            <Grid>
              {FormData.voter.map((voter, index) => {
                return (
                  <Paper
                    elevation={5}
                    key={index}
                    style={{ padding: "20px", margin: "20px auto" }}
                  >
                    <TextField
                      label="uniqueKey"
                      variant="outlined"
                      fullWidth
                      helperText={
                        <Typography style={{ color: "#EC7700" }}>
                          {formErrors.voter &&
                            formErrors.voter.map((vot) => (
                              <>{vot.id === index && vot.uniqueKey}</>
                            ))}
                        </Typography>
                      }
                      placeholder="enter Voter uniqueKey (like employee id or admission id)"
                      onChange={(event) => handleFormChange(event, index)}
                      margin="normal"
                      name="uniqueKey"
                      value={voter.uniqueKey}
                    />
                    <TextField
                      label="email"
                      variant="outlined"
                      fullWidth
                      helperText={
                        <Typography style={{ color: "#EC7700" }}>
                          {formErrors.voter &&
                            formErrors.voter.map((vot) => (
                              <>{vot.id === index && vot.email}</>
                            ))}
                        </Typography>
                      }
                      placeholder="enter Voter email"
                      onChange={(event) => handleFormChange(event, index)}
                      margin="normal"
                      name="email"
                      type={"email"}
                      value={voter.email}
                    />
                    <Button onClick={() => removeFields(index)}>
                      <DeleteIcon />
                    </Button>
                  </Paper>
                );
              })}
            </Grid>
          </Container>
          <Button onClick={AddMore}>
            <AddIcon />
          </Button>
          <Typography variant="h5">
            Add voter details using this sample file and then upload
          </Typography>
          <a href={VoterList} download="voterList">
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Sample Csv File
            </Button>
          </a>{" "}
          <br />
          <br />
          {
            <Typography style={{ color: "#EC7700" }}>
              {formErrors.duplicateVoterMessage}
            </Typography>
          }
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            Upload
            <input
              hidden
              accept=".csv,.xlsx,.xls"
              type="file"
              onChange={(e) => {
                const files = e.target.files;

                if (files) {
                  Papa.parse(files[0], {
                    header: true,
                    complete: ({ data }) => {
                      const newData = [
                        ...new Map(
                          data.map((item) => [item["email"], item])
                        ).values(),
                      ];

                      if (
                        newData[0].hasOwnProperty("uniqueKey") &&
                        data[0].hasOwnProperty("email")
                      ) {
                        const duplicateIds = data
                          .map((e) => e["email"])
                          .map((e, i, final) => final.indexOf(e) !== i && i)
                          .filter((obj) => data[obj])
                          .map((e) => data[e]["email"]);
                        if (duplicateIds.length !== 0) {
                          toast.error(
                            `${duplicateIds.length} duplicate email found and removed `,
                            {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            }
                          );
                        }
                        setFormData((prevValue) => ({
                          ...prevValue,
                          voter: newData,
                        }));
                      } else {
                        toast.error(
                          `Csv File Not matching , please select valid file or download and edit sample file `,
                          {
                            position: "bottom-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                      }
                    },
                  });
                }
              }}
            />
          </Button>
        </>
      )}
    </>
  );
}

export default VoterDetails;
