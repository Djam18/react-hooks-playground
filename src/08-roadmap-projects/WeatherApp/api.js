// Visual Crossing API - meme API que toutes les versions precedentes
// Python CLI → Flask API → Django DRF → React frontend
// LA 4EME VERSION DU WEATHER PROJECT!
const API_KEY = 'DEMO_KEY'; // TODO: mettre dans .env

export async function fetchWeather(city) {
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function formatTemp(celsius) {
  return `${Math.round(celsius)}°C`;
}
