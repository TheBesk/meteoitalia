import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ lat, lon, data }) {

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
  }, [lat, lon, data]);

  return (
    <div>
      <h2>Previsioni</h2>
      <ul>
        {result.slice(0, 5).map((item, index) => (
          <li key={index}>
            <p>Data: {item.localDate.substring(8, 10)}-{item.localDate.substring(5, 7)}-{item.localDate.substring(0, 4)}</p>
            <p>Temperatura Massima: {item.maxCelsius !== "-" ? `${item.maxCelsius}°C` : "-"}</p>
            <p>Temperatura Minima: {item.minCelsius !== "-" ? `${item.minCelsius}°C` : "-"}</p>
            
            <img src={process.env.PUBLIC_URL + `./icons/${item.icon}.png`} alt={`${item.icon}`} width="100" height="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;