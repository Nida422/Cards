"use client"

export const fetchWeather = async (city: string) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY`);
  return res.json();
};
