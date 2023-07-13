import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Chip, Card, CardContent, CardMedia } from "@mui/material";

function Weather({ lat, lon }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/meteo?lat=${lat}&lon=${lon}`);
        setResult(response.data.extrainfo.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [lat, lon]);

  return (
    <Box
      sx={{
        background: "transparent",
        padding: "1rem",
        borderRadius: "4px",
        marginTop: "1rem",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
 
 <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
        {result.slice(0, 5).map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
           <Card sx={{ maxWidth: 400 }}>
              <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="body1" component="p" gutterBottom>
                    {item.localDate.substring(8, 10)}-{item.localDate.substring(5, 7)}-{item.localDate.substring(0, 4)}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {" "}
                    {item.maxCelsius !== "-" ? (
                      <Chip label={`${item.maxCelsius}°C`} color="error" />
                    ) : (
                      "-"
                    )}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {" "}
                    {item.minCelsius !== "-" ? (
                      <Chip label={`${item.minCelsius}°C`} color="primary" />
                    ) : (
                      "-"
                    )}
                  </Typography>
                </div>
                <CardMedia
                  component="img"
                  image={process.env.PUBLIC_URL + `./icons/${item.icon}.png`}
                  alt={item.icon}
                  style={{ width: 100, height: 100, marginLeft: "1rem" }}
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default Weather;