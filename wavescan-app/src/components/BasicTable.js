import * as React from "react";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "../mui";

// Default styling for table cells
const StyledTableCell = styled(TableCell)({
  color: "white",
  paddingRight: 4,
  paddingLeft: 5,
  borderBottom: "none",
  fontSize: "15pt",
});

const BasicTable = (props) => {
  const { headers, rows, rowOrder } = props;

  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell key={header} align='left'>
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {/* Loop through the row order and display the data for each header */}
              {rowOrder.map((cell) => (
                <StyledTableCell key={cell} align='left'>
                  {row[cell]}
                </StyledTableCell>
              ))}
              <StyledTableCell align='left'>
                <Button
                  variant='contained'
                  // If scanner status is already engaged, button should be disabled
                  disabled={row.status == "Engaged"}
                  sx={{
                    "&.Mui-disabled": {
                      background: "grey",
                      color: "darkgrey",
                    },
                  }}
                >
                  Connect
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
