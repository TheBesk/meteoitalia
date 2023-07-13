import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Cities from "./Cities";
import Weather from "./Weather";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:3001/api/geocoder?q=${searchQuery}`);
      setData(result.data.results);
      setSelectedItem(null);
      setWeatherData(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchData();
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleItemClick = async (lat, lon) => {
    try {
      const result = await axios.get(`http://localhost:3001/api/meteo?lat=${lat}&lon=${lon}`);
      setWeatherData(result.data);
      setSelectedItem({ lat, lon });
      setData([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom right, #f2f7f8, #bce7e9)",
      padding: "1rem",
    }}>
      <a style={{textDecoration: 'none',color: 'black'}} href="/"><Typography variant="h3" sx={{ textAlign: "center" }}>Meteo Italia 🇮🇹</Typography></a>
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "1rem" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Inserisci città"
              variant="outlined"
              fullWidth
              sx={{ marginRight: "0.5rem", "& .MuiOutlinedInput-root": { paddingRight: "0" } }}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" sx={{ p: 0, paddingRight: "20px" }}>
                    <SearchIcon/>
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {data.length > 0 && (
        <Cities data={data} onItemClick={handleItemClick} />
      )}

      {selectedItem && (
        <Weather lat={selectedItem.lat} lon={selectedItem.lon} data={weatherData} />
      )}
    </Box>
  );
}

export default App;