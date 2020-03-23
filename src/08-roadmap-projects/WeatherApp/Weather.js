import React, { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';
import { fetchWeather } from './api';

// LA 4EME VERSION DU WEATHER PROJECT:
// Python CLI (2018) → Flask API (2019) → Django DRF (2019) → React (2020)
// "It's satisfying to see the same idea evolve across 4 stacks"
function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  console.log('Weather rendered, city:', city);

  const handleSearch = useCallback(async (searchCity) => {
    setCity(searchCity);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(searchCity);
      setWeatherData(data);
    } catch (err) {
      console.error('weather fetch error:', err);
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Weather App (roadmap.sh) — v4 React</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Same project: Python CLI → Flask → Django DRF → React. Evolution!
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading weather for {city}...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}. Try a different city.</p>}

      {weatherData && !loading && (
        <>
          <h4 style={{ margin: '0 0 10px 0' }}>{city}</h4>
          <WeatherCard data={weatherData} />
          <Forecast data={weatherData} />
        </>
      )}

      {!weatherData && !loading && !error && (
        <p style={{ color: '#999' }}>Type a city to see the weather</p>
      )}
    </div>
  );
}

export default Weather;
