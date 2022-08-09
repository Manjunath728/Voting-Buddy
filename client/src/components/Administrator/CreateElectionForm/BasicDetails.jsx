import React from "react";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
const getPresentTime = () => {
  const date = new Date();
  return date.toISOString().substring(0, 16);
};
const getNextTime = () => {
  const date = new Date(Date.now() + 1 * (60 * 60 * 1000));
  return date.toISOString().substring(0, 16);
};
function BasicDetails({ FormData, setFormData, formErrors }) {
  return (
    <>
      <TextField
        id="Election"
        label="Election Title"
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.electionTitle}
          </Typography>
        }
        variant="outlined"
        placeholder="Enter Eletion Title"
        fullWidth
        margin="normal"
        name="electionTitle"
        value={FormData.electionTitle}
        onChange={(event) =>
          setFormData({ ...FormData, electionTitle: event.target.value })
        }
      />
      <TextField
        label="Election Start At"
        type="datetime-local"
        margin="normal"
        sx={{ width: "49%", marginRight: "1%" }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: getPresentTime() }}
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.electionStartAt}
          </Typography>
        }
        value={FormData.electionStartAt}
        onChange={(event) =>
          setFormData({ ...FormData, electionStartAt: event.target.value })
        }
      />
      <TextField
        id="End At"
        label="Election End At"
        type="datetime-local"
        margin="normal"
        sx={{ width: "49%", marginLeft: "1%" }}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.electionEndAt}
          </Typography>
        }
        inputProps={{ min: getNextTime() }}
        value={FormData.electionEndAt}
        onChange={(event) =>
          setFormData({ ...FormData, electionEndAt: event.target.value })
        }
      />

      <FormLabel>Security type</FormLabel>
      
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="security type"
        
        value={FormData.securityType}
        onChange={(event) =>
          setFormData({ ...FormData, securityType: event.target.value })
        }
      >
        <FormControlLabel value="Private" control={<Radio />} label="Private" />
        <FormControlLabel value="Public" control={<Radio />} label="Public" />
        
      </RadioGroup>
      {
          <Typography style={{ color: "#EC7700" }}>
            {formErrors.securityType}
          </Typography>
      }
      {FormData.securityType==="Private"&&<Typography style={{color:"#EC7700"}} >
        In  private election  voter List is required........................................!
      </Typography>}<br></br>
      <FormLabel>Should administrator acess Live result </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Yes"
        name="security type"
        value={FormData.adminAcessType}
        onChange={(event) =>
          setFormData({ ...FormData, adminAcessType: event.target.value })
        }
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
      <FormLabel>Should Voter acess result </FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Yes"
        name="security type"
        value={FormData.voterAcessType}
        onChange={(event) =>
          setFormData({ ...FormData, voterAcessType: event.target.value })
        }
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </>
  );
}

export default BasicDetails;
