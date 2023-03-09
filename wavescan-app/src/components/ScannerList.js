import React, { useState, useEffect } from "react";
import axios from "axios";

import { styled } from "@mui/system";
import BasicTable from "./BasicTable";
import { Card, Divider, Typography, Box } from "../mui";

const Container = styled("div")({
  backgroundColor: "#2e2e35",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const MuiCard = styled(Card)({
  background: 'rgb(0,0,0,0.1)',
  boxShadow: '0 0 50px rgb(255,255,255,0.4) inset',
  padding: 50,
  borderRadius: 20,
  width: "60%",
  margin: "auto"
});

const ScannerList = () => {
  const [rows, setRows] = useState([]);

  // Getting data of scanners
  useEffect(() => {
    var url = "https://wavescan-internship.saurabhmudgal.repl.co/success";
    axios
      .get(url)
      .then((response) => {
        manageRows(response.data);
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
  }, []);

  const manageRows = (data) => {
    // Determining the status of scanners based on their availability
    for (var row of data) {
      if (row.isAvailable == "true") {
        row.status = "Available";
      } else if (row.isAvailable == "false") {
        row.status = "Engaged";
      }
    }

    setRows(data);
  };

  return (
    <>
      <Container>
        <MuiCard>
          <Box sx={{p: { xs: 2, md: 4, lg: 15 }}}>
          <Typography variant='h5' sx={{color: 'white'}}>Scanners found: {rows.length}</Typography>
          <Divider sx={{bgcolor: 'white', my: 2}} />
          <BasicTable
            headers={[
              "Scanner Name",
              "IP Address",
              "Scanner Speed",
              "Status",
              "",
            ]}
            rows={rows}
            // Determine the order in which the data is displayed based on response data keys
            rowOrder={["scannerName", "ipAddress", "scannerSpeed", "status"]}
          />
        </Box>
        </MuiCard>
      </Container>
    </>
  );
};

export default ScannerList;
