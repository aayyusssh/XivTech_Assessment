const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.post('/getWeather', async (req, res) => {
 try {
    const cityNames = req.body.cities;
    const weatherData = {};

    for (const cityName of cityNames) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
      );
      const data = await response.json();
      weatherData[cityName] = `${data.main.temp - 273.15}C`;
    }

    res.json({ weather: weatherData });
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
