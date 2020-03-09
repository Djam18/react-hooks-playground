import React from 'react';

function WeatherCard({ data }) {
  if (!data) return null;

  const current = data.current_condition[0];
  const temp = current.temp_C;
  const feels = current.FeelsLikeC;
  const desc = current.weatherDesc[0].value;
  const humidity = current.humidity;
  const wind = current.windspeedKmph;

  console.log('WeatherCard rendered', desc);

  return (
    <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '10px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{desc}</h3>
      <p style={{ fontSize: '48px', margin: '0 0 5px 0' }}>{temp}°C</p>
      <p style={{ color: '#666', margin: '0 0 10px 0' }}>Feels like {feels}°C</p>
      <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
        <span>Humidity: {humidity}%</span>
        <span>Wind: {wind} km/h</span>
      </div>
    </div>
  );
}

export default WeatherCard;
