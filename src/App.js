import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div className="App">
      <h1>Meteo Italia 🇮🇹</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Inserisci città"
        />
        <button type="submit">Cerca</button>
      </form>

      {data.length > 0 && (
        <Cities data={data} onItemClick={handleItemClick} />
      )}

      {selectedItem && (
        <Weather lat={selectedItem.lat} lon={selectedItem.lon} data={weatherData} />
      )}
    </div>
  );
}

export default App;