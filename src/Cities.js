import React from "react";
import { Box, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";

function Cities({ data, onItemClick }) {
  const visibleData = data.slice(0, 5); // Limita il numero di link visualizzati a 5

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #bfe9eb, #bce7e9)",
        padding: "1rem",
        borderRadius: "4px",
        marginTop: "1rem",
        width: "48%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <TableContainer style={{ width: "100%" }}>
        <Table>
          <TableBody>
            {visibleData.map((item, index) => (
              <TableRow key={index} onClick={() => onItemClick(item.lat, item.lon)}  style={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {item.display_name
                    .replace(item.county, "")
                    .replace(",", "")
                    .replace(", ,", ",")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Cities;