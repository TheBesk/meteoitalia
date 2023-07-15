const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

const corsOptions = {
//  origin: 'http://localhost:3000',
    origin: '*', //solo per test
};

app.use(cors(corsOptions));

app.get('/api/meteo', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const result = await axios.get(`https://api.meteoam.it/deda-meteograms/meteograms?request=GetMeteogram&layers=preset1&latlon=${lat},${lon}`);
    res.send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore nella richiesta all\'API meteo');
  }
});

app.get('/api/geocoder', async (req, res) => {
  try {
    const { q } = req.query;
    const result = await axios.get(`https://api.meteoam.it/geocoder/?q=${q}`);
    res.send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore nella richiesta all\'API Geocoder');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});