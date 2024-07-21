import axios from 'axios';

export const extractDurationFromLink = async (link) => {
  // Implementar la lógica para extraer la duración del video
  // Por ejemplo, usar la API de YouTube Data para obtener la duración
  // Aquí hay un ejemplo simplificado:
  const videoId = link.split('v=')[1];
  const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Reemplaza con tu clave de API de YouTube
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`);
  const durationISO = response.data.items[0].contentDetails.duration;
  const duration = convertISODurationToSeconds(durationISO);
  return duration;
};

const convertISODurationToSeconds = (durationISO) => {
  // Convertir la duración ISO 8601 a segundos
  // Ejemplo: PT1H2M10S a 3730 segundos
  let totalSeconds = 0;
  const hoursMatch = durationISO.match(/(\d+)H/);
  const minutesMatch = durationISO.match(/(\d+)M/);
  const secondsMatch = durationISO.match(/(\d+)S/);
  if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
  if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
  if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);
  return totalSeconds;
};
