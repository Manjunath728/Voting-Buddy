import React, { useState } from "react";
import BallotIcon from "@mui/icons-material/Ballot";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Inter", "sans-serif"],
      textTransform: "none",
      fontSize: 16,
    },
  },
  palette: { primary: { main: "#EC7700" } },
});
function VoterHeader(props) {
  const navigate = useNavigate();
  const [openDialog, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    navigate("/");
    toast.success("logged out sucessfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div>
      <>
        <header className="header sticky">
          <ThemeProvider theme={theme}>
            <h1 className="logo">
              <Link to="/voter/dashboard" style={{ cursor: "pointer" }}>
                <BallotIcon
                  fontSize="large"
                  sx={{
                    color: "#EC7700",
                    fontSize: "26px",
                  }}
                />{" "}
                VotingBuddy
              </Link>
            </h1>
            <div style={{ marginRight: "10px" }}>
              <Typography variant="h5">HI {props.username}</Typography>
            </div>
            <Button
              style={{ color: "white" }}
              onClick={()=>{setOpen(true)}}
              variant="contained"
            >
              LogOut
            </Button>
            <Dialog
            open={openDialog}
            onClose={() => {
              setOpen(false);
            }}
          >
            <DialogTitle>Log Out ?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure Logout?

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button  onClick={() => {
                setOpen(false);
              }}>Cancel</Button>
              <Button onClick={ handleLogout } autoFocus>Logout</Button>
            </DialogActions>
          </Dialog>
          </ThemeProvider>
        </header>
        <header className="header ">
          <h1 className="logo">
            <Link to="/voter/dashboard" style={{ cursor: "pointer" }}>
              <BallotIcon
                fontSize="large"
                sx={{
                  color: "#EC7700",
                  fontSize: "26px",
                }}
              />{" "}
              VotingBuddy
            </Link>
          </h1>
        </header>
      </>
    </div>
  );
}

export default VoterHeader;
