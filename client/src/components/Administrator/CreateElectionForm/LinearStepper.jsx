import {
  Button,
  createTheme,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  unstable_composeClasses,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchPrice from "../../hooks/useFetchPrice";
import BallotDesign from "./BallotDesign";
import BasicDetails from "./BasicDetails";
import Payment from "./Payment";
import VoterDetails from "./VoterDetails";

function getStep() {
  return ["Basic Details", "Ballot Design", "Voter Details", "Payment"];
}
const getTime = (time) => {
  const date = new Date(time);
  return date.toISOString().substring(0, 13);
};
const getNextTime = (time) => {
  const date = new Date(time);
  date.setHours(date.getHours() + 1);
  return date.toISOString().substring(0, 13);
};

function LinearStepper() {
  const navigate = useNavigate();
  const { price, error } = useFetchPrice();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [FormData, setFormData] = useState({
    electionTitle: "",
    electionStartAt: "",
    electionEndAt: "",
    securityType: "",
    adminAcessType: true,
    voterAcessType: true,
    ballotInstruction: "",
    postionName: "",
    votePerVoter: "",
    electionInstruction: "",
    nota: false,
    candidates: [
      { candidateName: "", candidateManifesto: "" },
      { candidateName: "", candidateManifesto: "" },
    ],
    voter: [{ uniqueKey: "", email: "" }],
    maxVoter: "",
    price: "",
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <BasicDetails
            formErrors={formErrors}
            FormData={FormData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <BallotDesign
            formErrors={formErrors}
            FormData={FormData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <VoterDetails
            formErrors={formErrors}
            FormData={FormData}
            price={price}
            setFormData={setFormData}
          />
        );

      case 3:
        return (
          <Payment
            formErrors={formErrors}
            FormData={FormData}
            setFormData={setFormData}
          />
        );

      default:
        break;
    }
  }
  const [activeStep, setActiveStep] = useState(0);
  const steps = getStep();

  const handleNext = () => {
    if (activeStep === 2 && FormData.securityType === "Private") {
      let data = [...FormData.voter];
      setFormData((prevValue) => ({
        ...prevValue,
        maxVoter: data.length,
        price: data.length * price,
      }));
    }
    
    setFormErrors(validate(FormData));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setActiveStep(activeStep + 1);
    }
    if (Object.keys(formErrors).length !== 0 && isSubmit) {
      toast.error("please enter every details corectly", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (activeStep === 0) {
      if (!values.electionTitle) {
        errors.electionTitle = "election Title  is required....!";
      }
      if (!values.electionStartAt) {
        errors.electionStartAt = "election Start time is required....!";
      }
      if (!values.electionEndAt) {
        errors.electionEndAt = "election End time is required....!";
      } else if (
        getNextTime(values.electionStartAt) > getTime(values.electionEndAt)
      ) {
        errors.electionEndAt =
          "election duration should be atleat one hour ....!";
      }
      if (!values.securityType) {
        errors.securityType = "please tell your election type ....!";
      }
      return errors;
    } else if (activeStep === 1) {
      errors.candidates = [];
      if (!values.ballotInstruction) {
        errors.ballotInstruction = "Ballot Instruction is required....!";
      }
      if (!values.postionName) {
        errors.postionName = "postion Name is required....!";
      }

      if (!values.electionInstruction) {
        errors.electionInstruction = "election Instruction  is required....!";
      }

      values.candidates.forEach((can, index) => {
        if (!can.candidateName) {
          errors.candidates = [
            ...errors.candidates,
            { id: index, candidateName: "candidateName is required....!" },
          ];
        }
        if (!can.candidateManifesto) {
          errors.candidates = [
            ...errors.candidates,
            {
              id: index,
              candidateManifesto: "candidateManifesto is required....!",
            },
          ];
        }
      });
      const duplicateCandidates = values.candidates
        .map((e) => e["candidateName"])
        .map((e, i, final) => final.indexOf(e) !== i && i)
        .filter((obj) => values.candidates[obj])
        .map((e) => values.candidates[e]["candidateName"]);

      if (duplicateCandidates.length !== 0) {
        errors.duplicateCandidatesMessage =
          "Duplicate candidate names are entered please check....!";
      }
      if (!values.votePerVoter) {
        errors.votePerVoter = "vote Per Voter  is required....!";
      } else if (!(0 < values.votePerVoter)) {
        errors.votePerVoter = "vote Per Voter should be atleast 1 ....!";
      } else if (!(values.candidates.length > values.votePerVoter)) {
        errors.votePerVoter =
          "votePerVoter  is should be less than candidates ....!";
      }
      if (errors.candidates.length === 0) {
        delete errors.candidates;
      }
      return errors;
    } else if (activeStep === 2) {
      if (values.securityType === "Private") {
        errors.voter = [];
        const duplicateVoter = values.voter
          .map((e) => e["email"])
          .map((e, i, final) => final.indexOf(e) !== i && i)
          .filter((obj) => values.voter[obj])
          .map((e) => values.voter[e]["email"]);

        values.voter.forEach((can, index) => {
          if (!can.email) {
            errors.voter = [
              ...errors.voter,
              { id: index, email: "email is required....!" },
            ];
          } else if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(can.email)
          ) {
            errors.voter = [
              ...errors.voter,
              { id: index, email: "please enter valid email ....!" },
            ];
          }
          if (!can.uniqueKey) {
            errors.voter = [
              ...errors.voter,
              { id: index, uniqueKey: "uniqueKey is required....!" },
            ];
          }
        });
        if (duplicateVoter.length !== 0) {
          errors.duplicateVoterMessage =
            "Duplicate Voters emails are entered please check....!";
        }
        if (errors.voter.length === 0) {
          delete errors.voter;
        }
        return errors;
      } else {
        if (!values.maxVoter) {
          errors.maxVoter = "please enter maximum number of voter....!";
        } else if (!(0 < values.maxVoter)) {
          errors.maxVoter =
            "please enter atleat 1 maximum number of voter....!";
        }
        return errors;
      }
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = async () => {
    if (FormData.nota) {
      setFormData((prevValue) => ({
        ...prevValue,
        candidates: [
          ...prevValue.candidates,
          { candidateName: "Nota", candidateManifesto: "None of the Above" },
        ],
      }));
    }
    if (FormData.securityType === "Private") {
      var FinalData = {
        details: {
          electionTitle: FormData.electionTitle,
          electionStartAt: FormData.electionStartAt,
          electionEndAt: FormData.electionEndAt,
          securityType: FormData.securityType,
          adminAcessType: FormData.adminAcessType,
          voterAcessType: FormData.voterAcessType,
        },
        ballots: {
          ballotInstruction: FormData.ballotInstruction,
          postionName: FormData.postionName,
          votePerVoter: FormData.votePerVoter,
          electionInstruction: FormData.electionInstruction,
          nota: true,
        },
        candidates: FormData.candidates,
        voter: FormData.voter,
        payment: {
          maxVoter: FormData.maxVoter,
          price: FormData.price,
        },
      };
    } else {
      FinalData = {
        details: {
          electionTitle: FormData.electionTitle,
          electionStartAt: FormData.electionStartAt,
          electionEndAt: FormData.electionEndAt,
          securityType: FormData.securityType,
          adminAcessType: FormData.adminAcessType,
          voterAcessType: FormData.voterAcessType,
        },
        ballots: {
          ballotInstruction: FormData.ballotInstruction,
          postionName: FormData.postionName,
          votePerVoter: FormData.votePerVoter,
          electionInstruction: FormData.electionInstruction,
          nota: true,
        },
        candidates: FormData.candidates,
        payment: {
          maxVoter: FormData.maxVoter,
          price: FormData.price,
        },
      };
    }

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/administrator/electioncreate",
        FinalData,
        config
      );
      if (data.sucess === true) {
        toast.success("Sucessfully Created Election", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/dashboard ");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
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

  return (
    <div>
      <ThemeProvider
        theme={createTheme({ palette: { primary: { main: "#EC7700" } } })}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <form>
          {getStepContent(activeStep)}
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ color: "white", margin: "1rem" }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}> Pay And Submit </Button>
          ) : (
            <Button
              sx={{ color: "white", margin: "1rem" }}
              onClick={handleNext}
              variant="contained"
            >
              Next
            </Button>
          )}
        </form>
      </ThemeProvider>
    </div>
  );
}

export default LinearStepper;
