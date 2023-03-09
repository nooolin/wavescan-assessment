import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Select,
  MenuItem,
} from "../mui";

// Default styling for components
const Container = styled("div")({
  backgroundColor: "#2e2e35",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const MuiCard = styled(Card)({
  background: "rgb(0,0,0,0.1)",
  boxShadow: "0 0 50px rgb(255,255,255,0.4) inset",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 50,
  borderRadius: 20,
});

const MuiTextField = styled(TextField)({
  width: "100%",
  background: "white",
  marginTop: 20,
  marginBottom: 20,
  borderRadius: 5,
});

const MuiSelect = styled(Select)({
  width: "100%",
  background: "white",
  marginTop: 20,
  marginBottom: 20,
  padding: 0,
  borderRadius: 5,
});

const MuiTypography = styled(Typography)({
  color: "white",
});

const Form = (props) => {
  // List of possible Scanning Modes
  const modeList = ["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"];

  // Initialize state for form data
  const [formData, setFormData] = useState({
    projectName: "",
    scanningMode: modeList[0],
    scanDimensionsX: 0,
    scanDimensionsY: 0,
    scannerFrequency: 0,
  });

  // Initialise state for potential errors in input
  const [nameError, setNameError] = useState(false);
  const [dimXError, setDimXError] = useState(false);
  const [dimYError, setDimYError] = useState(false);
  const [freqError, setFreqError] = useState(false);

  React.useEffect(() => {
    // Set errors to false if they are resolved at any point by user
    if (formData.projectName.length > 3) {
      setNameError(false);
    }
    if (formData.scanDimensionsX >= 1) {
      setDimXError(false);
    }
    if (formData.scanDimensionsY >= 1) {
      setDimYError(false);
    }
    if (formData.scannerFrequency >= 1) {
      setFreqError(false);
    }
  }, [formData]);

  const formatData = () => {
    // Ensuring that scan dimensions are integers, and frequency is a float
    formData.scanDimensionsX = parseInt(formData.scanDimensionsX);
    formData.scanDimensionsY = parseInt(formData.scanDimensionsY);
    formData.scannerFrequency =
      Math.round(parseFloat(formData.scannerFrequency) * 10) / 10;
  };
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Setting error state variables to true if error is found
    if (formData.projectName.length < 4) {
      setNameError(true);
    } else if (formData.scanDimensionsX < 1) {
      setDimXError(true);
    } else if (formData.scanDimensionsY < 1) {
      setDimYError(true);
    } else if (formData.scannerFrequency < 1) {
      setFreqError(true);
    } else {
      // No error, formats the data to ensure data types are appropriate for post request
      formatData();
      var url = "https://wavescan-internship.saurabhmudgal.repl.co/submitForm";
      axios
        .post(url, formData)
        .then(() => {
          props.onSubmit();
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  };

  const handleInputChange = (event) => {
    // Handle input changes
    var name = event.target.name;
    var value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Container>
        <MuiCard>
          <form onSubmit={handleSubmit}>
            <div>
              <MuiTypography>Project Name</MuiTypography>
              <MuiTextField
                type='text'
                name='projectName'
                value={formData.projectName}
                onChange={handleInputChange}
                size='small'
                sx={{ mb: nameError ? 0 : 2 }}
                error={nameError}
              />
              {nameError && (
                <Typography variant='caption' color='red'>
                  The project name has to be more than 3 characters long
                </Typography>
              )}
            </div>
            <div>
              <MuiTypography>Scanning Mode</MuiTypography>
              <MuiSelect
                name='scanningMode'
                value={formData.scanningMode}
                onChange={(e) => handleInputChange(e.target.value)}
                size='small'
              >
                {modeList.map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                ))}
              </MuiSelect>
            </div>
            <div>
              <MuiTypography>Scan Dimensions (cm)</MuiTypography>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Typography>X</Typography>
                <MuiTextField
                  name='scanDimensionsX'
                  type='number'
                  value={formData.scanDimensionsX}
                  onChange={handleInputChange}
                  size='small'
                  error={dimXError}
                />
                <Typography>Y</Typography>
                <MuiTextField
                  name='scanDimensionsY'
                  type='number'
                  value={formData.scanDimensionsY}
                  onChange={handleInputChange}
                  size='small'
                  error={dimYError}
                />
              </Box>
              {(dimXError || dimYError) && (
                <Typography variant='caption' color='red'>
                  The dimesions have to be more than or equal to 1
                </Typography>
              )}
            </div>
            <div>
              <MuiTypography>Scanner Frequency (GHz)</MuiTypography>
              <MuiTextField
                name='scannerFrequency'
                type='number'
                value={formData.scannerFrequency}
                onChange={handleInputChange}
                size='small'
                sx={{ mb: freqError ? 0 : 2 }}
                error={freqError}
              />
              {freqError && (
                <Typography variant='caption' color='red'>
                  The frequency has to be more than or equal to 1
                </Typography>
              )}
            </div>
            <Button
              type='submit'
              variant='contained'
              sx={{ display: "block", mx: "auto", width: "80%", mt: 2 }}
            >
              SCAN
            </Button>
          </form>
        </MuiCard>
      </Container>
    </>
  );
};

export default Form;
