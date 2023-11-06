import React, { useState } from 'react';
import axios from 'axios';

function App() {
 const [cities, setCities] = useState('');
 const [weather, setWeather] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/getWeather', { cities: cities.split(',') });
    setWeather(response.data.weather);
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter city names separated by commas" value={cities} onChange={(e) => setCities(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          {Object.entries(weather).map(([city, temp]) => (
            <p key={city}>{city}: {temp}</p>
          ))}
        </div>
      )}
