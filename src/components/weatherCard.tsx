 'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const cities = ['London', 'New York', 'Paris', 'Tokyo', 'Delhi', 'Sydney'];

export default function WeatherCard() {
  const [selectedCity, setSelectedCity] = useState<string>('London');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=5555fec8b3e34c16a0171427250604&q=${city}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow max-w-md">
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Select City
        </label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading weather...</p>}

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded">
          <p>Error: {error}</p>
        </div>
      )}

      {weather && !loading && (
        <div>
          <h2 className="text-xl font-bold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <div className="flex items-center space-x-4 mt-2">
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <div>
              <p className="text-lg">{weather.current.temp_c}°C</p>
              <p className="text-gray-600">{weather.current.condition.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
