import React from 'react';

function Forecast({ data }) {
  if (!data || !data.weather) return null;

  return (
    <div>
      <h4>5-Day Forecast</h4>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {data.weather.slice(0, 5).map((day, i) => (
          <div key={i} style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '80px',
            fontSize: '13px'
          }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
              {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
            </p>
            <p style={{ margin: '0 0 4px 0' }}>{day.maxtempC}°</p>
            <p style={{ margin: 0, color: '#666' }}>{day.mintempC}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
