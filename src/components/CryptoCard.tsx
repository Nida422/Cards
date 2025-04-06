 'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";

interface CryptoData {
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const cryptoOptions = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'solana'];

export default function CryptoCard() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoin}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCrypto(data[0]);
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, [selectedCoin]);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">Crypto Card</h2>

      <select
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
        title="Select Cryptocurrency"
      >
        {cryptoOptions.map((coin) => (
          <option key={coin} value={coin}>
            {coin.charAt(0).toUpperCase() + coin.slice(1)}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        crypto && (
          <div className="flex items-center space-x-4">
            <Image src={crypto.image} alt={crypto.name} className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Price: ${crypto.current_price.toFixed(2)}
              </p>
              <p
                className={`text-sm font-medium ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}% (24h)
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
