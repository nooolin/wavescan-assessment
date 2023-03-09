import React, { useState } from "react";
import Form from "./components/Form";
import ScannerList from "./components/ScannerList";
import logo from "./assets/images/wavescan-logo.png";

import { styled } from "@mui/system";
import { Box } from "./mui";

// Default styling for components
const Background = styled("div")({
  backgroundColor: "#2e2e35",
  minHeight: "95vh",
  paddingBottom: "5vh",
});

const MuiBox = styled(Box)({
  backgroundColor: "#2e2e35",
  paddingTop: 30,
  paddingBottom: 30,
  paddingLeft: 80
});

const Logo = styled("img")({
  width: "200px",
  height: "auto",
});

function App() {
  // Initialise state to check if form has been successfully submitted
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = () => {
    // Once Form component calls onSubmit prop, set submitSuccess state variable to true
    setSubmitSuccess(true);
  };

  return (
    <div className='App'>
      <Background>
        <MuiBox>
          <Logo
            src={logo}
            alt='Wavescan logo'
          />
        </MuiBox>
        {/* If form has not been submitted, display form */}
        {!submitSuccess && <Form onSubmit={handleFormSubmit} />}

        {/* If form has been submitted, display list of scanners */}
        {submitSuccess && <ScannerList />}
      </Background>
    </div>
  );
}

export default App;
